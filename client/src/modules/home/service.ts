import { EndPoint } from '@/apis'
import { ENV_CONFIG } from '@/config'
import { axiosClient } from '@/shared/utils'
import { notionClient } from '@/shared/utils/notionClient'

export const HomeService = {
    getList: () => {
        return axiosClient.get(EndPoint.List)
    }
}
