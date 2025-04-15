import { NextResponse } from 'next/server';
import { registerUser } from '@/services/authService';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const organizationId = process.env.DEFAULT_ORG_ID!;

  const user = await registerUser(email, password, organizationId);
  return NextResponse.json(user);
}
