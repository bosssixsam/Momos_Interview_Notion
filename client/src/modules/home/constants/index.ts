import { ItemModel } from '@/interfaces/models'
import { BoolEnum } from '@/shared/enum'
import { FilterParams, InitialStateProps } from '../interface'

export const DefaultColumnsKey: Array<keyof ItemModel> = [
    'name',
    'description',
    'money',
    'isEkyc',
    'select',
    'status',
    'tags',
    'url',
    'updateTime'
]

export const InitialState: InitialStateProps = {
    loading: false,
    data: [],
    error: null
}

export const FilterState: FilterParams = {
    name: '',
    isEkyc: BoolEnum.ALL
}

export const IsEkycOptions: {
    value: BoolEnum
    label: string
}[] = [
    // { value: BoolEnum.ALL, label: 'All' },
    { value: BoolEnum.TRUE, label: 'Yes' },
    { value: BoolEnum.FALSE, label: 'No' }
]
