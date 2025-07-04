import {useCookies} from '@vueuse/integrations/useCookies'// useCookies

const TokenKey="admin-token"
const  cookie=useCookies()


//获取token

export function getToken(){
    return cookie.get(TokenKey)
}

//设置token
export function setToken(token){
    return cookie.set(TokenKey,token)
}

//清除 cookie
export function removeToken (){
    return cookie.remove(TokenKey)
}