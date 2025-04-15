import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type CampoEditable = 'title' | 'description' | 'completed'

export const TaskService = {
  async getTareas(userId: number) {
    return prisma.task.findMany({
      where: { userId, deleted: false },
      orderBy: { createdAt: 'desc' },
    })
  },

  async createTarea(data: {
    title: string
    description: string
    dueDate: Date
    userId: number
  }) {
    return prisma.task.create({
      data,
    })
  },

  async updateTarea(id: number, userId: number, data: Partial<Record<CampoEditable, any>>) {
    const tarea = await prisma.task.findUnique({ where: { id } })
    if (!tarea || tarea.userId !== userId) throw new Error('No autorizado o tarea no encontrada')

    const cambios: {
      taskId: number
      field: string
      oldValue: string
      newValue: string
    }[] = []

    for (const campo of ['title', 'description', 'completed'] as CampoEditable[]) {
      if (campo in data && data[campo] !== tarea[campo]) {
        cambios.push({
          taskId: tarea.id,
          field: campo,
          oldValue: String(tarea[campo]),
          newValue: String(data[campo]),
        })
      }
    }

    const tareaActualizada = await prisma.task.update({
      where: { id },
      data,
    })

    if (cambios.length > 0) {
      await prisma.taskHistory.createMany({ data: cambios })
    }

    return tareaActualizada
  },

  async softDeleteTarea(id: number, userId: number) {
    const tarea = await prisma.task.findUnique({ where: { id } })
    if (!tarea || tarea.userId !== userId) throw new Error('No autorizado o tarea no encontrada')

    return prisma.task.update({
      where: { id },
      data: { deleted: true },
    })
  },

  async restoreTarea(id: number, userId: number) {
    const tarea = await prisma.task.findUnique({ where: { id } })
    if (!tarea || tarea.userId !== userId || !tarea.deleted) {
      throw new Error('No autorizado o tarea no eliminada')
    }

    return prisma.task.update({
      where: { id },
      data: { deleted: false },
    })
  },

  async getHistorial(taskId: number, userId: number) {
    const tarea = await prisma.task.findUnique({ where: { id: taskId } })
    if (!tarea || tarea.userId !== userId) throw new Error('No autorizado o tarea no encontrada')

    return prisma.taskHistory.findMany({
      where: { taskId },
      orderBy: { changedAt: 'desc' },
    }) 
  },  

  async getTareasEliminadas(userId: number) {
    return prisma.task.findMany({
      where: {
        userId,
        deleted: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },
}
