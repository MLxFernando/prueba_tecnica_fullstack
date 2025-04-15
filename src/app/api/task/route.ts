import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/authMiddleware';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = token && verifyToken(token);

  if (!user) return new NextResponse('Unauthorized', { status: 401 });

  const tasks = await prisma.task.findMany({

  });

  return NextResponse.json(tasks);
}
