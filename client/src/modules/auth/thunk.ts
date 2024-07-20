import { setToken } from '@/shared/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginRequest } from './interface'
import { AuthService } from './service'

export const login = createAsyncThunk('auth/login', async (data: LoginRequest, { rejectWithValue }) => {
    try {
        const response = await AuthService.login(data)
        if (response.data) {
            const { token, refreshToken } = response.data ?? {}

            setToken({
                accessToken: token,
                refreshToken
            })
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

export const authUserThunk = createAsyncThunk('auth/user', async (_, { rejectWithValue }) => {
    try {
        const response = await AuthService.getCurrentUser()

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
