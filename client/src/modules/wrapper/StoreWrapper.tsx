'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { Store } from '@reduxjs/toolkit'

//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString()
}
export interface StoreWrapperProps {
    store: Store
    children: React.ReactNode
}

const StoreWrapper: React.FC<StoreWrapperProps> = ({ store, children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default StoreWrapper
