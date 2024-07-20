// console.log('test get token', getToken())
// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import cookie from 'cookie'

// import { PATH } from 'config/path'
// import { TOKEN_STORAGE_KEY, getToken } from 'utils/token'

// This function can be marked `async` if using `await` inside

const testToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MjA3ODI5OTYsImV4cCI6MTcyMDc4MzA1Nn0.967cy8KmGMzaqx6GQDu-OlyQ_bXClgh15aDJTrKUYeU`

export function middleware(request: NextRequest) {
    const cookies = cookie.parse(request.headers.get('cookie') || '')

    // if (request.cookies.get(TOKEN_STORAGE_KEY)) {
    //     if (getToken()?.x_tenant_id === 'non-tenant') {
    //         return NextResponse.redirect(new URL(PATH.onboarding, request.url))
    //     } else {
    //         //   if (request.nextUrl.pathname.startsWith(PATH.Auth)) {
    //         //     return NextResponse.redirect(new URL(PATH.replenishment, request.url));
    //         //   }

    //         if (
    //             request.nextUrl.pathname.startsWith(PATH.SignIn) ||
    //             request.nextUrl.pathname.startsWith(PATH.SignUp) ||
    //             request.nextUrl.pathname.startsWith(PATH.ForgotPassword)
    //         ) {
    //             return NextResponse.redirect(new URL(PATH.replenishment, request.url))
    //         }
    //     }
    //     // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     //     return NextResponse.redirect(new URL('/login', request.url))
    //     // }
    // } else {
    //     if (
    //         //   !request.nextUrl.pathname.startsWith(PATH.Auth) &&
    //         !request.nextUrl.pathname.startsWith(PATH.SignUp) &&
    //         !request.nextUrl.pathname.startsWith(PATH.SignIn) &&
    //         !request.nextUrl.pathname.startsWith(PATH.ForgotPassword)
    //     ) {
    //         return NextResponse.redirect(new URL(PATH.SignIn, request.url))
    //     }
    //     // if (!request.nextUrl.pathname.concat(PATH.Auth)) {
    //     //     return NextResponse.redirect(new URL('/', request.url))
    //     // }
    // }
    // if (request.nextUrl.pathname === '/') {
    //     return NextResponse.redirect(new URL(PATH.replenishment, request.url))
    // }

    NextResponse.next()
    // NextResponse.next()
    // return NextResponse.redirect(new URL(PATH.Auth, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // PATH.Auth,
        // PATH.Private,
        '/((?!api|static|.*\\..*|_next).*)'
        // '/((?!api|_next|static|favicon.ico).*)'
    ]
}
