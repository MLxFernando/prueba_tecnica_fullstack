import { z } from 'zod'

export const tareaSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  dueDate: z.coerce.date({ invalid_type_error: 'Fecha inválida' }),
})

export const tareaUpdateSchema = tareaSchema.partial().extend({
  completed: z.boolean().optional(),
})
