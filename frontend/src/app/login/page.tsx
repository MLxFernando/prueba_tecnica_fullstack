'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'

export default function LoginPage() {
  const { login } = useAuth()
  const { register, handleSubmit } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    login(data.email, data.password)
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          type="email"
          placeholder="Correo"
          className="w-full p-2 border rounded"
        />
        <input
          {...register('password')}
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}
