import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/authContext'

export const metadata = {
  title: 'Gestor de Tareas',
  description: 'Aplicación de tareas con autenticación',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
