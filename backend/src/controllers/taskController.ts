import { Request, Response } from 'express'
import { TaskService } from '../services/taskService'

export const getTareas = async (req: Request, res: Response) => {
  const userId = req.user.id
  const tareas = await TaskService.getTareas(userId)
  res.json(tareas)
}

export const createTarea = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { title, description, dueDate } = req.body
  const nueva = await TaskService.createTarea({ title, description, dueDate, userId })
  res.status(201).json(nueva)
}

export const updateTarea = async (req: Request, res: Response) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  try {
    const tarea = await TaskService.updateTarea(id, userId, req.body)
    res.json(tarea)
  } catch (err: any) {
    res.status(403).json({ message: err.message })
  }
}

export const deleteTarea = async (req: Request, res: Response) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  try {
    const tarea = await TaskService.softDeleteTarea(id, userId)
    res.json(tarea)
  } catch (err: any) {
    res.status(403).json({ message: err.message })
  }
}

export const restoreTarea = async (req: Request, res: Response) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  try {
    const tarea = await TaskService.restoreTarea(id, userId)
    res.json(tarea)
  } catch (err: any) {
    res.status(403).json({ message: err.message })
  }
}

export const getHistorial = async (req: Request, res: Response) => {
  const userId = req.user.id
  const taskId = Number(req.params.id)
  try {
    const historial = await TaskService.getHistorial(taskId, userId)
    res.json(historial)
  } catch (err: any) {
    res.status(403).json({ message: err.message })
  }
}

export const getTareasEliminadas = async (req: Request, res: Response) => {
  const userId = req.user.id

  try {
    const tareas = await TaskService.getTareasEliminadas(userId)
    res.json(tareas)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas eliminadas' })
  }
}
