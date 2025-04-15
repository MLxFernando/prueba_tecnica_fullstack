import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errores = result.error.format()
      res.status(400).json({ message: 'Error de validación', errores })
      return
    }

    req.body = result.data
    next()
  }
}
