import { EndPoint } from '@/apis'
import { LoginRequest } from '@/modules/auth/interface'
import { axiosClient } from '@/shared/utils'

export const AuthService = {
    getCurrentUser: () => {
        return axiosClient.get(EndPoint.AuthUser)
    },

    login: (data: LoginRequest) => {
        return axiosClient.post(EndPoint.Signin, data)
    }

    // refreshToken: (data: RefreshTokenRequest) => {
    //     return axiosClient.
    // }
}
