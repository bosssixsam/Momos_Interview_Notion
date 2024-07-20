/* eslint-disable react-hooks/rules-of-hooks */
import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { Saga } from 'redux-saga'
// import { Types } from '@/interfaces'
import { Reducer } from '@reduxjs/toolkit'

const injectReducerSaga = (keyReducerSaga: string, reducer: Types.Nullable<Reducer>, saga?: Types.Nullable<Saga>) => {
    reducer && useInjectReducer({ key: keyReducerSaga, reducer })
    saga && useInjectSaga({ key: keyReducerSaga, saga })
}

export default injectReducerSaga
