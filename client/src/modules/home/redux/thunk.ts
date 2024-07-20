import { createAsyncThunk } from '@reduxjs/toolkit'
import { ListRequest } from '../interface'
import { HomeService } from '../service'

export const KeyReducerSaga = '@home'

export const getListThunk = createAsyncThunk(`${KeyReducerSaga}/list`, async (params: ListRequest, { rejectWithValue }) => {
    try {
        const response = await HomeService.getList(params)

        if (response.data) {
            return response.data
        }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        rejectWithValue(err.response.data.error[0].message)
        throw err.response.data.error[0].message
    }
})
