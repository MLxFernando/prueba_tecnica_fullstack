import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed iniciado...')

  // Limpieza previa (opcional)
  await prisma.taskHistory.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  // 1. Crear una organización
  const org = await prisma.organization.create({
    data: {
      name: 'EmpresaDemo',
    },
  })

  // 2. Crear un usuario con contraseña hasheada
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      email: 'usuario@demo.com',
      password: hashedPassword,
      organizationId: org.id,
    },
  })

  // 3. Crear dos tareas para el usuario
  const task1 = await prisma.task.create({
    data: {
      title: 'Tarea inicial',
      description: 'Descripción de la tarea 1',
      dueDate: new Date('2025-04-30'),
      completed: false,
      userId: user.id,
    },
  })

  const task2 = await prisma.task.create({
    data: {
      title: 'Tarea completada',
      description: 'Descripción de la tarea 2',
      dueDate: new Date('2025-05-05'),
      completed: true,
      userId: user.id,
    },
  })

  // 4. Crear historial de cambios para las tareas
  await prisma.taskHistory.createMany({
    data: [
      {
        taskId: task1.id,
        field: 'title',
        oldValue: '',
        newValue: 'Tarea inicial',
      },
      {
        taskId: task2.id,
        field: 'completed',
        oldValue: 'false',
        newValue: 'true',
      },
    ],
  })

  console.log('Seed completado exitosamente.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
