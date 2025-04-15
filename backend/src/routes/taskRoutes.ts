import { Router } from 'express'
import {
  getTareas,
  createTarea,
  updateTarea,
  deleteTarea,
  restoreTarea,
  getHistorial,
  getTareasEliminadas
} from '../controllers/taskController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validate } from '../middlewares/validate'
import { tareaSchema, tareaUpdateSchema } from '../validations/taskSchema'

const router = Router()

router.use(authMiddleware)

router.get('/', getTareas)
router.post('/', validate(tareaSchema), createTarea)
router.put('/:id', validate(tareaUpdateSchema), updateTarea)
router.delete('/:id', deleteTarea)
router.patch('/restore/:id', restoreTarea)
router.get('/historial/:id', getHistorial)
router.get('/deleted', getTareasEliminadas)

export default router
