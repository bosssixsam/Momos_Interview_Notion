import { ItemModel } from '@/interfaces/models'
import { BoolEnum, SelectOptionEnum, SortingValue, StatusEnum } from '@/shared/enum'

export interface SortItem {
    sortName: string
    sortValue: SortingValue
}

export interface ListRequest {
    sort?: SortItem
}

export interface InitialStateProps {
    loading: boolean
    data: Array<ItemModel>
    error: Types.Nullable<any>
}

export interface FilterParams {
    name: string
    isEkyc: BoolEnum
    updateTime: Types.Undefined<Date>
    select: SelectOptionEnum
    money: string
    status: StatusEnum
    tags: string[]
}
