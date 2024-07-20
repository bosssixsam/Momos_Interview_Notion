import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { TableHeader } from '@/components/ui/table'
import { cn } from '@/shared/utils'

export interface TableHeadProps {
    headerClassName?: string
}

const TableHead: React.FC<TableHeadProps> = ({ headerClassName }) => {
    return (
        <TableHeader className={cn('bg-slate-100 rounded', headerClassName)}>
            {/* // config header --- */}

            {/* <DragDropContext onDragEnd={()}>
                <></>
            </DragDropContext> */}

            {/* {getHeaderGroups().map(({ headers, id }) => {
                return (
                    <TableRow key={id}>
                        {headers.map((header) => {
                            return <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                        })}
                    </TableRow>
                )
            })} */}
        </TableHeader>
    )
}

export default TableHead
