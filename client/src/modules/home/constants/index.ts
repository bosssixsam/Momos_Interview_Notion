import { ItemModel } from '@/interfaces/models'
import { InitialStateProps } from '../interface'

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
