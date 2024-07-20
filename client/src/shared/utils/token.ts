import Cookies from 'js-cookie'
import { AccessToken, RefreshToken } from '@/shared/constants'

export const setToken = (token: TokenType) => {
    // LocalStorage.set(LOGIN_STATE_LOCAL_STORAGE_KEY, data)
    Cookies.set(AccessToken, token.accessToken)
    Cookies.set(RefreshToken, token.refreshToken)
}
export const getToken = () => {
    let token = Cookies.get(AccessToken)
    return token
}

// export const clearToken = () => {
//     Cookie.remove(TOKEN_STORAGE_KEY)
//     LocalStorage.remove(LOGIN_STATE_LOCAL_STORAGE_KEY)
// }
