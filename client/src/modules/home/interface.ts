import { ItemModel } from '@/interfaces/models'
import { SortingValue } from '@/shared/enum'

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
