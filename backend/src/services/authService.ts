import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generarToken } from '../utils/jwt'

const prisma = new PrismaClient()

export const AuthService = {
  async registrarUsuario(email: string, password: string, organizationId: number = 1) {
    const existente = await prisma.user.findUnique({ where: { email } })
    if (existente) {
      throw new Error('El usuario ya existe')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoUsuario = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId,
      },
    })

    const token = generarToken({ id: nuevoUsuario.id, organizationId: nuevoUsuario.organizationId })

    return {
      token,
      user: {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
      },
    }
  },

  async loginUsuario(email: string, password: string) {
    const usuario = await prisma.user.findUnique({ where: { email } })
    if (!usuario) {
      throw new Error('Usuario no encontrado')
    }

    const valido = await bcrypt.compare(password, usuario.password)
    if (!valido) {
      throw new Error('Contraseña incorrecta')
    }

    const token = generarToken({ id: usuario.id, organizationId: usuario.organizationId })

    return {
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
      },
    }
  },
}
