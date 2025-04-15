import { Router } from 'express';
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  restoreTask
} from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Proteger todas las rutas
router.use(authenticate);

router.get('/', getUserTasks);               // GET /api/tasks
router.post('/', createTask);               // POST /api/tasks
router.put('/:id', updateTask);             // PUT /api/tasks/:id
router.delete('/:id', deleteTask);          // DELETE /api/tasks/:id
router.post('/:id/restore', restoreTask);   // POST /api/tasks/:id/restore

export default router;

