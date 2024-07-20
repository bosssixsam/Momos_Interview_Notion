import React from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableFooter, TableHeader, TableRow, Table as UTable, TableHead as UTableHead } from '@/components/ui/table'
import { cn } from '@/shared/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef, Table, flexRender } from '@tanstack/react-table'

export interface TableHeadProps {
    headerClassName?: string
    sortState?: string
    tableConfig: Table<any>
    onDragEnd: (result: DropResult) => void
    onSortClick: (id: string) => void
}

const TableHead: React.FC<TableHeadProps> = ({ sortState, tableConfig, onDragEnd, onSortClick }) => {
    const [client, setClient] = React.useState(false)
    const { getHeaderGroups, getState } = tableConfig

    React.useEffect(() => {
        if (window !== undefined) {
            setClient(true)
        }
    }, [])

    return (
        <TableHeader className={cn('bg-slate-100 rounded')}>
            {client && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided) => {
                            return (
                                <>
                                    {getHeaderGroups().map(({ headers, id }) => {
                                        return (
                                            <TableRow key={id} ref={provided.innerRef} {...provided.droppableProps}>
                                                {headers.map((header, index) => {
                                                    return (
                                                        <UTableHead
                                                            key={index}
                                                            className="relative"
                                                            style={{
                                                                width: header.getSize()
                                                            }}
                                                        >
                                                            {/* <div className="bg-slate-500 w-[1px] h-full absolute top-0 left-0"></div> */}
                                                            <Draggable key={header.id} draggableId={header.id} index={index}>
                                                                {(provided) => {
                                                                    return (
                                                                        <div
                                                                            key={header.id}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <div className="flex justify-between items-center">
                                                                                {flexRender(
                                                                                    header.column.columnDef.header,
                                                                                    header.getContext()
                                                                                )}
                                                                                <Button
                                                                                    className={cn(
                                                                                        'w-[30px] h-[30px] p-1 flex justify-center items-center bg-transparent',
                                                                                        sortState === header.id && 'bg-slate-400'
                                                                                    )}
                                                                                    onClick={() => onSortClick(header.id)}
                                                                                >
                                                                                    <CaretSortIcon className="text-blue-500 h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                            <div
                                                                className="bg-slate-500 w-[2px] h-full absolute top-0 right-0 cursor-col-resize select-none touch-none"
                                                                style={{
                                                                    transform: header.column.getIsResizing()
                                                                        ? `translateX(${getState().columnSizingInfo.deltaOffset}px)`
                                                                        : ''
                                                                }}
                                                                onMouseDown={header.getResizeHandler()}
                                                                onTouchStart={header.getResizeHandler()}
                                                            ></div>
                                                        </UTableHead>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </>
                            )
                        }}
                    </Droppable>
                </DragDropContext>
            )}
        </TableHeader>
    )
}

export default TableHead
