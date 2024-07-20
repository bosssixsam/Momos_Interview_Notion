import { EndPoint } from '@/apis'
import { ENV_CONFIG } from '@/config'
import { axiosClient } from '@/shared/utils'
import { notionClient } from '@/shared/utils/notionClient'
import { ListRequest, SortItem } from './interface'

export const HomeService = {
    getList: (params?: ListRequest) => {
        const sort: Types.Undefined<SortItem> = params?.sort
        const filter = params?.filter

        return axiosClient.get(EndPoint.List, {
            params: {
                sort,
                filter
            }
        })
    }
}
