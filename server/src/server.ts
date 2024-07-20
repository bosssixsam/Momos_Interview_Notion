require("dotenv").config();
import http from "http";
import { Client } from "@notionhq/client";

// This is Typescript  interface for the shape of the object we will
// create based on our database to send to the React app
// When the data is queried it will come back in a much more complicated shape, so our goal is to
// simplify it to make it easy to work with on the front end
interface ThingToLearn {
  label: string;
  url: string;
}

// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

// Initializing the Notion client with your secret
const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.url) {
    case "/":
      // Query the database and wait for the result
      const query = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      // We map over the complex shape of the results and return a nice clean array of
      // objects in the shape of our `ThingToLearn` interface
      const list: any[] = query.results.map((row) => {
        console.log("afsd", row);

        const data: any = row.properties;

        return {
          id: row.id,
          name: data.Name.type === "title" ? data.Name.title[0].plain_text : "",
          tags: data.Tags.type === "multi_select" ? data.Tags.multi_select : [],
          url: data.URL.type === "url" ? data.URL.url : "",
          description: data.Description.type === "rich_text" ? data.Description.rich_text[0].plain_text : "",
          money: data.Money.type === "number" ? data.Money.number : null,
          select: data.Select.type === "select" ? data.Select.select : null,
          isEkyc: data.IsEKYC.type === "checkbox" ? data.IsEKYC.checkbox : false,
          status: data.Status.type === "status" ? data.Status.status : null,
          updateTime: data.updateTime.type === "last_edited_time" ? data.updateTime.last_edited_time : null,
        };
      });

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(list));
      break;

    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
