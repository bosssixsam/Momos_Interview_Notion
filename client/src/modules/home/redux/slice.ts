// import { IRootState } from '@/modules/shared'
import { createSlice } from '@reduxjs/toolkit'
import { KeyReducerSaga, getListThunk } from './thunk'

// import { ReduxInitialState, ReduxKey } from './constant'
// import { login } from './thunk'

const homeSlice = createSlice({
    name: KeyReducerSaga,
    initialState: {},
    reducers: {
        // checkAuth: (state) => {
        //   const token = getToken();
        //   if (token && token !== null) {
        //     state.isAuth = true;
        //   } else {
        //     state.isAuth = false;
        //   }
        // },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getListThunk.pending, (state) => {
                // state.loading = true
            })
            .addCase(getListThunk.fulfilled, (state, action) => {
                // state.loading = false
                // state.isAuth = true;
                // state.error = null;
            })
            .addCase(getListThunk.rejected, (state, action) => {
                console.log('slcicee', action.error)

                // state.loading = false
                // state.isAuth = false;
                // state.error = action.error.message;
            })
    }
})

// Actions

// export const authAction = authSlice.actions

// Selectors

// export const selectAuth = (state: IRootState<any>) => state.auth

// Reducer

export const homeReducer = homeSlice.reducer
