import { createContext, ReactNode, useEffect, useState } from 'react'
import {
  loginLocalStorage,
  logoutLocalStorage,
  TOKEN_KEY,
} from '../../services/auth'
import { jsontowwServerAPI } from '../../services/JsontowwServerAPI/apiClient'

type AuthContextProps = {
  children: ReactNode
}

export interface IUser {
  username: string
  name: string
  email: string
  isAdmin: boolean
}

interface IAuthContext {
  loading: boolean
  authenticated: boolean
  user: IUser | null
  token: string | null
  socketConnected: boolean
  setAuthenticated: (authenticated: boolean) => void
  setUser: (user: IUser) => void
  setToken: (token: string) => void
  onLoginSuccess: (res: any) => Promise<boolean>
  onLoginFailure: (res: any) => boolean
  onSignoutSuccess: () => boolean
  setSocketConnected: (socketConnected: boolean) => void
}

export const intialValue: IAuthContext = {
  loading: false,
  authenticated: false,
  user: null,
  token: null,
  socketConnected: false,
  setAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {},
  onLoginSuccess: () => {
    return Promise.resolve(false)
  },
  onLoginFailure: () => {
    return false
  },
  onSignoutSuccess: () => {
    return false
  },
  setSocketConnected: () => {},
}

const AuthContext = createContext<IAuthContext>(intialValue)

function AuthContextProvider({ children }: AuthContextProps) {
  const [authenticated, setAuthenticated] = useState(intialValue.authenticated)
  const [user, setUser] = useState(intialValue.user)
  const [token, setToken] = useState(intialValue.token)
  const [loading, setLoading] = useState<boolean>(true)
  const [socketConnected, setSocketConnected] = useState(
    intialValue.socketConnected,
  )

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = localStorage.getItem(TOKEN_KEY)

      if (storagedToken) {
        setToken(storagedToken)
        setAuthenticated(true)
        jsontowwServerAPI.defaults.headers.Authorization = `Bearer ${storagedToken}`
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  async function onLoginSuccess(data: any) {
    const { token, user } = data

    if (token) {
      setToken(token)
      loginLocalStorage(token)

      setUser(user)
      setAuthenticated(true)
    }

    jsontowwServerAPI.defaults.headers.Authorization = `Bearer ${token}`

    return true
  }

  function onLoginFailure(res: any) {
    setAuthenticated(false)
    logoutLocalStorage()
    setUser(null)
    return true
  }

  function onSignoutSuccess() {
    setAuthenticated(false)
    logoutLocalStorage()
    setUser(null)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        user,
        token,
        socketConnected,
        setAuthenticated,
        setUser,
        setToken,
        onLoginSuccess,
        onLoginFailure,
        onSignoutSuccess,
        setSocketConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext
