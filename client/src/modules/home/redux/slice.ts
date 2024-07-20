// import { IRootState } from '@/modules/shared'
import { RootState } from '@/stores/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { InitialState } from '../constants'
import { InitialStateProps } from '../interface'
import { KeyReducerSaga, getListThunk } from './thunk'

const homeSlice = createSlice({
    name: KeyReducerSaga,
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getListThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getListThunk.fulfilled, (state, action) => {
                console.log('asdfasfd', action.payload)

                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(getListThunk.rejected, (state, action) => {
                console.log('slcicee', action.error)

                state.loading = false
                // state.isAuth = false;
                // state.error = action.error.message;
            })
    }
})

// Actions

// export const authAction = authSlice.actions

// Selectors

const rootSelector = (state: { [key: string]: InitialStateProps }) => state[KeyReducerSaga]

export const selectHome = () => createSelector(rootSelector, (item) => item)

// Reducer

export const homeReducer = homeSlice.reducer
