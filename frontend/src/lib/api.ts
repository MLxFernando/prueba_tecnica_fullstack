import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ✅ Función para login
export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password })
  const { token, user } = res.data
  localStorage.setItem('token', token)
  return user
}

// ✅ Función para registro
export const register = async (email: string, password: string) => {
  const res = await api.post('/auth/register', { email, password })
  const { token, user } = res.data
  localStorage.setItem('token', token)
  return user
}

// ✅ Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token')
}
