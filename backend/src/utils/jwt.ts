import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export function generarToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function verificarToken(token: string): any {
  return jwt.verify(token, JWT_SECRET)
}
