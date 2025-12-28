import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Destination from '@/models/Destination';

// GET: Fetch all destinations (Fast & Cached by browser)
export async function GET() {
  await connectDB();
  const destinations = await Destination.find({}).sort({ createdAt: -1 });
  return NextResponse.json(destinations);
}

// POST: Add a new destination (Admin only logic can be added here later)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const newDestination = await Destination.create(body);
    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
