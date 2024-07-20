'use client'

import React from 'react'
import { LoginRequest } from '@/modules/auth/interface'
import { authUserThunk, login } from '@/modules/auth/thunk'
import { useAppDispatch } from '@/shared/hooks'
import { getToken } from '@/shared/utils'
import { AuthService } from '../service'

const TestParams: LoginRequest = {
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 1
}

const LoginPage = () => {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(login(TestParams))
    }

    const handleTest = () => {
        dispatch(authUserThunk())
    }

    return (
        <div className="">
            <p>Login</p>

            <button onClick={handleTest}>test auth</button>

            <button onClick={handleClick}>test function</button>
        </div>
    )
}

export default LoginPage
