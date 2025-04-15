import { Request, Response } from 'express'
import { AuthService } from '../services/authService'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const data = await AuthService.registrarUsuario(email, password)
    res.json(data)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const data = await AuthService.loginUsuario(email, password)
    res.json(data)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
