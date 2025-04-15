import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getUserTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'Usuario no autorizado' });
    return;
  }

  const tasks = await taskService.getTasks(userId);
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const organizationId = req.user?.organizationId;

  if (!userId || !organizationId) {
    res.status(401).json({ error: 'Usuario no autorizado' });
    return;
  }

  const task = await taskService.createTask(userId, organizationId, req.body);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  if (!userId) {
    res.status(401).json({ error: 'Usuario no autorizado' });
    return;
  }

  const updated = await taskService.updateTask(userId, taskId, req.body);
  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  if (!userId) {
    res.status(401).json({ error: 'Usuario no autorizado' });
    return;
  }

  await taskService.softDeleteTask(userId, taskId);
  res.status(204).send();
};

export const restoreTask = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const taskId = req.params.id;

  if (!userId) {
    res.status(401).json({ error: 'Usuario no autorizado' });
    return;
  }

  const restored = await taskService.restoreTask(userId, taskId);
  res.json(restored);
};
