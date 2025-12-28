import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose'; // Faster than jsonwebtoken
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    // 3. Generate Token (Valid for 24 hours)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    // 4. Set Cookie
    const response = NextResponse.json({ message: 'Login successful', role: user.role });
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
