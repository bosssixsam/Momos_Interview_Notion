'use client'

import React from 'react'
import * as HomeItem from '@/modules/home/components'
import * as homeRedux from '@/modules/home/redux'
import { useAppDispatch } from '@/shared/hooks'
import injectReducerSaga from '@/stores/injectReducerSaga'
import { ListRequest, SortItem } from '../interface'

const NotionList = () => {
    injectReducerSaga(homeRedux.KeyReducerSaga, homeRedux.homeReducer)

    const dispatch = useAppDispatch()

    // React.useEffect(() => {
    //     loadList()
    // }, [])

    const loadList = (sort?: SortItem, filter?: Record<string, any>) => {
        const params: ListRequest = {
            sort,
            filter
        }

        dispatch(homeRedux.getListThunk(params))
    }

    return (
        <div className="space-y-4">
            <h1>NotionList</h1>
            <div className="">
                <HomeItem.DataTable loadData={loadList} />
            </div>
        </div>
    )
}

export default NotionList
