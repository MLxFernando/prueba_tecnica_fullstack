import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null;
  }
}
