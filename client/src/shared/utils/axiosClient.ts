import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { EndPoint } from '@/apis'
import { ENV_CONFIG } from '@/config'
import { AccessToken, RefreshToken, RetryKey } from '@/shared/constants'
import { setToken } from './token'

const axiosClient = axios.create({
    baseURL: ENV_CONFIG.apiURL, // TODO: take this api URL from env
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

// Change request data/error here
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(AccessToken)

        if (config.headers && typeof token === 'string') {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Change response data/error here
axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError) => {
        const currentRequest = error.config
        const { status } = error.response ?? {}

        // check if token expired ---

        // if (status === 401 && currentRequest && !currentRequest[RetryKey as keyof typeof currentRequest]) {
        //     const refreshToken = Cookies.get(RefreshToken) ?? ''

        //     currentRequest[RetryKey as keyof typeof currentRequest] = true
        //     try {
        //         const params: RefreshTokenRequest = {
        //             refreshToken
        //         }
        //         const result = await axios.post(`${ENV_CONFIG.apiURL}${EndPoint.RefreshToken}`, params)

        //         if (result.data) {
        //             setToken({
        //                 accessToken: result.data.token,
        //                 refreshToken: result.data.refreshToken
        //             })
        //             axiosClient.defaults.headers.common.Authorization = `Bearer ${result.data.token}`
        //             currentRequest.headers.Authorization = `Bearer ${result.data.token}`

        //             return axiosClient(currentRequest)
        //         }
        //     } catch (error) {
        //         return error
        //     }
        // }

        // throw normal error ---

        return error
    }
)

export default axiosClient
