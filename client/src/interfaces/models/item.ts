import { TagModel } from './tag'

export interface ItemModel {
    id: string
    name: string
    tags: TagModel[]
    url: string
    description: string
    money: number
    select: TagModel
    isEkyc: boolean
    status: TagModel
    updateTime: string
}
