// import { ReduxKey as Auth } from '@/modules/auth/constant'
// import { authReducer } from '@/modules/auth/slice'
import { combineReducers } from '@reduxjs/toolkit'

export default function createReducer(injectedReducers = {}) {
    return combineReducers({
        preDefinedReducer: (state = null) => state,
        // [Auth]: authReducer,
        // [userSlice.KeyReducerSaga]: userSlice.userReducer,
        // [sportRedux.slice.KEY_REDUCER_SAGA]: sportRedux,
        // [KeyAuth]: authReducer,
        ...injectedReducers
    })
}
