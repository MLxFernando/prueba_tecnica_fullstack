'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'

export default function RegisterPage() {
  const { register: registrar } = useAuth()
  const { register, handleSubmit } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    registrar(data.email, data.password)
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Registrarse
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}
