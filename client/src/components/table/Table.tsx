import React from 'react'
import { TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, Table as UTable } from '@/components/ui/table'
import { cn } from '@/shared/utils'
import { ColumnDef as RTColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

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
}

const Table = <TData extends object>({ columns, headerClassName, data }: TableProps<TData>) => {
    const wrapperDivRef = React.useRef<HTMLDivElement>(null)

    const { getHeaderGroups, getRowModel, getFooterGroups } = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    })
    // const { getHeaderGroups, getRowModel, getFooterGroups } = table

    // console.log('asfd TEST TABLE -----', getFooterGroups())

    return (
        <UTable>
            <TableHeader className={cn('bg-slate-100 rounded', headerClassName)}>
                {/* // config header --- */}

                {getHeaderGroups().map(({ headers, id }) => {
                    return (
                        <TableRow key={id}>
                            {headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableHeader>

            <TableBody>
                {/* // config body --- */}

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
