import React, {ReactNode, useCallback} from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallback, FullPageLoading } from "components/lib"
import { useQueryClient } from "react-query"

interface AuthForm {
    username: string,
    password: string
}
// 保存登陆状态
const bootstrapUser = async() => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}
const AuthContext = React.createContext < {
    user: User | null, 
    login: (form: AuthForm) => Promise<void>, 
    register: (form: AuthForm) => Promise<void>, 
    logout: () => Promise<void>,
}| undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()
    const queryClient = useQueryClient()

    // point free
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    // const login = (form: AuthForm) => auth.login(form).then(user =>( setUser(user)))
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => {
        setUser(null)
        // 清除缓存
        queryClient.clear()
    })
    useMount(useCallback(
        () => {
            run(bootstrapUser())
        }, [run]
    ))
    if(isIdle || isLoading) {
        return <FullPageLoading/>
    }
    if(isError) {
        return <FullPageErrorFallback error={error}/>
    }
    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}