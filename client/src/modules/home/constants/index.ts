import { ItemModel } from '@/interfaces/models'
import { BoolEnum, SelectOptionEnum, StatusEnum, TagsEnum } from '@/shared/enum'
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
    isEkyc: BoolEnum.ALL,
    updateTime: undefined,
    select: SelectOptionEnum.ALL,
    money: '',
    status: StatusEnum.ALL,
    tags: []
}

export const IsEkycOptions: {
    value: BoolEnum
    label: string
}[] = [
    // { value: BoolEnum.ALL, label: 'All' },
    { value: BoolEnum.TRUE, label: 'Yes' },
    { value: BoolEnum.FALSE, label: 'No' }
]

export const SelectOptions: {
    value: SelectOptionEnum
    label: string
}[] = [
    {
        label: SelectOptionEnum.PM,
        value: SelectOptionEnum.PM
    },
    {
        label: SelectOptionEnum.Others,
        value: SelectOptionEnum.Others
    },
    {
        label: SelectOptionEnum.Tech,
        value: SelectOptionEnum.Tech
    },
    {
        label: SelectOptionEnum.NoneTech,
        value: SelectOptionEnum.NoneTech
    }
]

export const StatusOptions: {
    value: StatusEnum
    label: string
}[] = [
    // { value: BoolEnum.ALL, label: 'All' },
    { value: StatusEnum.NotStart, label: StatusEnum.NotStart },
    { value: StatusEnum.InProgress, label: StatusEnum.InProgress },
    { value: StatusEnum.Completed, label: StatusEnum.Completed }
]

export const TagsOptions: {
    value: TagsEnum
    label: string
}[] = [
    // { value: BoolEnum.ALL, label: 'All' },
    { value: TagsEnum.React, label: TagsEnum.React },
    { value: TagsEnum.NextJS, label: TagsEnum.NextJS },
    { value: TagsEnum.NestJS, label: TagsEnum.NestJS },
    { value: TagsEnum.Javascript, label: TagsEnum.Javascript },
    { value: TagsEnum.Css, label: TagsEnum.Css }
]
