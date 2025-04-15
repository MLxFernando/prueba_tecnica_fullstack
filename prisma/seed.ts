import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Crear organización
  const org = await prisma.organization.create({
    data: {
      name: 'Organizacion de prueba',
    },
  });

  // Crear usuario con contraseña hasheada
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'demo@usuario.com',
      password: passwordHash,
      organizationId: org.id,
    },
  });

  // Crear tarea para ese usuario creado anteriormente
  const task = await prisma.task.create({
    data: {
      title: 'Tarea inicial',
      description: 'Esta es una tarea de prueba.',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: user.id,
      organizationId: org.id,
    },
  });

  // Historial de cambios de la tarea
  await prisma.taskHistory.create({
    data: {
      taskId: task.id,
      field: 'title',
      oldValue: '',
      newValue: 'Tarea inicial',
    },
  });

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
