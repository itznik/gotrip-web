import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    await connectDB();

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // 2. Hash Password (Security best practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User
    // HACK: First user is always admin for easier setup, change logic later if needed
    const count = await User.countDocuments();
    const role = count === 0 ? 'admin' : 'user';

    await User.create({ username, email, password: hashedPassword, role });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
