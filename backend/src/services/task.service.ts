import { prisma } from '../lib/prisma';

export const getTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });
};

export const createTask = async (
    userId: string,
    organizationId: string,
    data: { title: string; description: string; dueDate: Date }
  ) => {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        userId,
        organizationId
      }
    });
};  

export const updateTask = async (userId: string, taskId: string, data: { title: string }) => {
  return prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { title: data.title }
  });
};

export const softDeleteTask = async (userId: string, taskId: string) => {
  return prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { deletedAt: new Date() }
  });
};

export const restoreTask = async (userId: string, taskId: string) => {
  return prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { deletedAt: null }
  });
};
