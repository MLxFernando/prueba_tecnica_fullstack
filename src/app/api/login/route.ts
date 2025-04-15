import { NextResponse } from 'next/server';
import { loginUser } from '@/services/authService';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const result = await loginUser(email, password);
  if (!result) return new NextResponse('Invalid credentials', { status: 401 });

  return NextResponse.json(result);
}
