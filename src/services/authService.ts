import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(email: string, password: string, organizationId: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      organizationId,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign(
    { userId: user.id, organizationId: user.organizationId },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token, user };
}
