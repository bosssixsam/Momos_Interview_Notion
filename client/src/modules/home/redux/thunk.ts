import { createAsyncThunk } from '@reduxjs/toolkit'
import { HomeService } from '../service'

export const KeyReducerSaga = '@home'

export const getListThunk = createAsyncThunk(`${KeyReducerSaga}/list`, async (_, { rejectWithValue }) => {
    try {
        const response = await HomeService.getList()
        console.log('asdfasdf', response)
        // if (response.data) {
        //     const { token, refreshToken } = response.data ?? {}
        //     setToken({
        //         accessToken: token,
        //         refreshToken
        //     })
        //     return response.data
        // }
    } catch (err: any) {
        if (!err.response) {
            throw err
        }
        rejectWithValue(err.response.data.error[0].message)
        throw err.response.data.error[0].message
    }
})
