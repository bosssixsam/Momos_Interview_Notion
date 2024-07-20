'use client'

import React from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { ColumnDef, Table } from '@/components/table'
import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Table as UTable } from '@/components/ui/table'
import { ItemModel } from '@/interfaces/models'
import { MockListDatta } from '@/mock/data'
import { DefaultColumnsKey } from '@/modules/home/constants'
import { cn } from '@/shared/utils'
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

export interface DataTableProps<T extends object> {}

const DataTable = <T extends object>(props: DataTableProps<T>) => {
    const [client, setClient] = React.useState(false)
    const [columns, setColumns] = React.useState<Array<keyof ItemModel>>(DefaultColumnsKey)
    const configColumns = columns.map((item) => {
        return {
            accessorKey: item
        }
    })

    const { getHeaderGroups, getRowModel, getFooterGroups, getState } = useReactTable({
        columns: configColumns,
        data: MockListDatta,
        getCoreRowModel: getCoreRowModel()
    })

    React.useEffect(() => {
        if (window !== undefined) {
            setClient(true)
        }
    }, [])

    // const configColumns = React.useMemo<ColumnDef<ItemModel>[]>(() => {
    //     return columns.map((item) => {
    //         return {
    //             accessorKey: item
    //         }
    //     })
    // }, [columns])

    const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const getListStyle = (isDraggingOver: boolean) => ({
        // background: isDraggingOver ? 'lightblue' : 'lightgrey',
        // display: 'flex',
        // padding: grid,
        overflow: 'auto'
    })

    const handleDragEnd = (result: DropResult) => {
        console.log('dragEnd', result)

        if (!result.destination) {
            return
        }
        const items = reorder(columns, result.source.index, result.destination.index)
        setColumns(items as (keyof ItemModel)[])
    }

    const testttt = [
        { id: 'item-1', content: 'Item 1' },
        { id: 'item-2', content: 'Item 2' },
        { id: 'item-3', content: 'Item 3' }
    ]

    return (
        <div className="p-4">
            DataTable
            {client && (
                <UTable>
                    <TableHeader className={cn('bg-slate-100 rounded')}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided) => {
                                    return (
                                        <>
                                            {getHeaderGroups().map(({ headers, id }) => {
                                                return (
                                                    <TableRow key={id} ref={provided.innerRef} {...provided.droppableProps}>
                                                        {headers.map((header, index) => {
                                                            return (
                                                                <TableHead
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
                                                                                                'w-[30px] h-[30px] p-1 flex justify-center items-center bg-transparent'
                                                                                            )}
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
                                                                </TableHead>

                                                                // <TableHead key={header.id}>
                                                                //     {flexRender(header.column.columnDef.header, header.getContext())}
                                                                // </TableHead>
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
                    </TableHeader>

                    <TableBody>
                        {getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

                    {getFooterGroups().map((footerGroup) => {
                        if (footerGroup.depth > 0) {
                            return (
                                <TableFooter>
                                    <TableRow key={footerGroup.id}>
                                        {footerGroup.headers.map((header) => (
                                            <TableCell key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.footer, header.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableFooter>
                            )
                        }
                    })}
                </UTable>
            )}
        </div>
    )
}

export default DataTable
