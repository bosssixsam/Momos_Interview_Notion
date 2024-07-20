'use client'

import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { ColumnDef, Table } from '@/components/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ItemModel, TagModel } from '@/interfaces/models'
import * as FilterItem from '@/modules/home/components/filter'
import { DefaultColumnsKey, FilterState, IsEkycOptions, SelectOptions, StatusOptions, TagsOptions } from '@/modules/home/constants'
import { selectHome } from '@/modules/home/redux'
import { formatDate, reorderItem } from '@/modules/home/utils'
import { SortingValue } from '@/shared/enum'
// import { cn } from '@/shared/utils'
import { FilterParams, SortItem } from '../interface'
import HelperBar from './HelperBar'

export interface DataTableProps<T extends object> {
    loadData: (sort?: SortItem) => void
}

const DataTable = <T extends object>({ loadData }: DataTableProps<T>) => {
    const { data } = useSelector(selectHome()) || {}
    const [sort, setSort] = React.useState<string>('')
    const [sortValue, setSortValue] = React.useState<SortingValue>(SortingValue.ASCENDING)
    const [columns, setColumns] = React.useState<Array<keyof ItemModel>>(DefaultColumnsKey)
    const [filterState, setFilterState] = React.useState<FilterParams>(FilterState)

    React.useEffect(() => {
        const sortParams: Types.Undefined<SortItem> =
            sort.length > 0
                ? {
                      sortName: sort,
                      sortValue
                  }
                : undefined

        loadData(sortParams)
    }, [sort, sortValue])

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return
        }
        const items = reorderItem(columns, result.source.index, result.destination.index)
        setColumns(items as (keyof ItemModel)[])
    }

    /// Handle sorting ---

    const handleSortValue = (value?: SortingValue) => {
        if (value) {
            setSort(value)
        } else {
            if (sortValue === SortingValue.ASCENDING) {
                setSortValue(SortingValue.DESCENDING)
            }
            if (sortValue === SortingValue.DESCENDING) {
                setSortValue(SortingValue.ASCENDING)
            }
        }
    }

    const handleSort = (id: string) => {
        if (id === sort) {
            handleSortValue()
        } else {
            handleSortValue(SortingValue.ASCENDING)
        }
        setSort(id)
    }

    const handleRemoveSort = () => {
        setSort('')
        setSortValue(SortingValue.ASCENDING)
    }

    /// handling filter ---

    const handleFilter = <T extends string | number | Types.Undefined<Date> | string[]>(value: T, name: string) => {
        setFilterState((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const configColumns = React.useMemo<ColumnDef<ItemModel>[]>(() => {
        return columns.map((item) => {
            return {
                accessorKey: item,
                ...(item === 'updateTime' && {
                    cell({ getValue }) {
                        const value = getValue<string>()
                        return formatDate(value)
                    }
                }),
                ...(item === 'isEkyc' && {
                    cell({ getValue }) {
                        const value = getValue<boolean>()
                        return <Checkbox checked={value} disabled />
                    }
                }),
                ...(item === 'select' && {
                    cell({ getValue }) {
                        const value = getValue<TagModel>()
                        return <Badge>{value.name}</Badge>
                    }
                }),
                ...(item === 'status' && {
                    cell({ getValue }) {
                        const value = getValue<TagModel>()
                        return <Badge variant={'secondary'}>{value.name}</Badge>
                    }
                }),
                ...(item === 'tags' && {
                    cell({ getValue }) {
                        const value = getValue<TagModel[]>()
                        return (
                            <div className="flex flex-wrap space-x-1 space-y-1">
                                {value.map((item, index) => (
                                    <Badge key={index} variant={'outline'}>
                                        {item.name}
                                    </Badge>
                                ))}
                            </div>
                        )
                    }
                })
            }
        })
    }, [columns])

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-wrap items-center space-y-2 space-x-3">
                <FilterItem.Search placeHolder="Search name" name="name" value={filterState.name} onChangeValue={handleFilter<string>} />
                <FilterItem.Search
                    isNumber
                    placeHolder="Search money"
                    name="money"
                    value={filterState.money}
                    onChangeValue={handleFilter<string>}
                />
                <FilterItem.Select
                    name={'select'}
                    placeHolder="select"
                    value={filterState.select}
                    options={SelectOptions}
                    onValueChange={handleFilter<string>}
                />
                <FilterItem.Select
                    name={'isEkyc'}
                    placeHolder="isEkyc"
                    value={filterState.isEkyc}
                    options={IsEkycOptions}
                    onValueChange={handleFilter<string>}
                />
                <FilterItem.Select
                    name={'status'}
                    placeHolder="status"
                    value={filterState.status}
                    options={StatusOptions}
                    onValueChange={handleFilter<string>}
                />
                <FilterItem.Multiselect
                    placeholder="tags"
                    name="tags"
                    value={filterState.tags}
                    options={TagsOptions}
                    onChangeValue={handleFilter<string[]>}
                />
                <FilterItem.Picker name="updateTime" value={filterState.updateTime} onChangeValue={handleFilter<Types.Undefined<Date>>} />

                {/* <FilterItem.StatusFilter />
                <FilterItem.DateFilter />
                <FilterItem.CheckboxFilter />
                <FilterItem.TagFilter />
                <FilterItem.DropdownFilter /> */}
            </div>
            <HelperBar sort={sort} onSortTagClick={handleRemoveSort} />
            <div className="flex items-center justify-center">
                <div className="max-h-[80vh] overflow-y-auto">
                    <Table sortState={sort} columns={configColumns} data={data ?? []} onDragEnd={handleDragEnd} onSortClick={handleSort} />
                </div>
            </div>
        </div>
    )
}

export default DataTable
