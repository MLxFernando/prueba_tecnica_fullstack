import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    if (!result) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    res.status(200).json(result);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error interno' });
  }
};

