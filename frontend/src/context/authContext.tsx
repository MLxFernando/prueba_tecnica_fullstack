'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login as loginApi, register as registerApi, logout as logoutApi } from '@/lib/api'

interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const userData = await loginApi(email, password)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/tasks')
  }

  const register = async (email: string, password: string) => {
    const userData = await registerApi(email, password)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/tasks')
  }

  const logout = () => {
    logoutApi()
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
