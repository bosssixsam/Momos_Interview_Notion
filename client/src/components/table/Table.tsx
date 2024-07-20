import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { TableBody, TableCell, TableFooter, TableRow, Table as UTable } from '@/components/ui/table'
import { cn } from '@/shared/utils'
import { ColumnDef as RTColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import TableHead from './TableHead'

export interface ColumnMeta {
    width?: number
    // align?: ColumnAlign
    // sticky?: ColumnSticky
    // padding?: number
    // sort?: string
    // infoHint?: React.ReactNode
    cellClassName?: string
}

export type ColumnDef<T extends object> = RTColumnDef<T> & {
    meta?: ColumnMeta
}

export interface TableProps<TData extends object> {
    loading?: boolean
    layout?: 'fixed' | 'auto'
    headerClassName?: string
    columns: ColumnDef<TData>[]
    data: Array<TData>
    sortState?: string
    onDragEnd: (result: DropResult) => void
    onSortClick: (id: string) => void
}

const Table = <TData extends object>({ loading, columns, headerClassName, data, sortState, onDragEnd, onSortClick }: TableProps<TData>) => {
    const wrapperDivRef = React.useRef<HTMLDivElement>(null)

    const tableConfig = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    })
    const { getRowModel, getFooterGroups } = tableConfig

    return (
        <UTable>
            <TableHead
                sortState={sortState}
                headerClassName={headerClassName}
                tableConfig={tableConfig}
                onDragEnd={onDragEnd}
                onSortClick={onSortClick}
            />

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
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableFooter>
                    )
                }
            })}
        </UTable>
    )
}

export default Table
