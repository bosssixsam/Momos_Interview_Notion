'use client'

import React from 'react'
import * as HomeItem from '@/modules/home/components'
import * as homeRedux from '@/modules/home/redux'
import { useAppDispatch } from '@/shared/hooks'
import injectReducerSaga from '@/stores/injectReducerSaga'

const NotionList = () => {
    injectReducerSaga(homeRedux.KeyReducerSaga, homeRedux.homeReducer)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        loadList()
    }, [])

    const loadList = () => {
        dispatch(homeRedux.getListThunk())
    }

    return (
        <div className="space-y-4">
            <h1>NotionList</h1>
            <div className="">
                <HomeItem.DataTable />
            </div>
        </div>
    )
}

export default NotionList
