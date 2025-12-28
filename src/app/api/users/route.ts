import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import connectDB from '@/lib/db';
import User from '@/models/User';

// Helper to check admin
async function isAdmin(req: Request) {
  const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
  if (!token) return false;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === 'admin';
  } catch { return false; }
}

export async function GET(req: Request) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  await connectDB();
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  if (!await isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  await connectDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted' });
}
