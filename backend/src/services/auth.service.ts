import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const DEFAULT_ORG_ID = process.env.DEFAULT_ORG_ID!;

export async function registerUser(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('El usuario ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      organizationId: DEFAULT_ORG_ID,
    },
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign(
    { userId: user.id, organizationId: user.organizationId },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token, user };
}
