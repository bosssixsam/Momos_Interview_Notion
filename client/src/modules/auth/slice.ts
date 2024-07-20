// import { IRootState } from '@/modules/shared'
import { createSlice } from '@reduxjs/toolkit'
import { ReduxInitialState, ReduxKey } from './constant'
import { login } from './thunk'

const authSlice = createSlice({
    name: ReduxKey,
    initialState: ReduxInitialState,
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

            // login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                // state.isAuth = true;
                // state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
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

// export const selectAuth = (state: IRootState<any>) => state.auth

// Reducer

export const authReducer = authSlice.reducer
