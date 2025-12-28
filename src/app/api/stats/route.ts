import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Visitor from '@/models/Visitor';
import User from '@/models/User';
import Destination from '@/models/Destination';

export async function GET() {
  await connectDB();
  
  // Get today's date string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // 1. Increment Visitor Count (Upsert: Create if not exists)
  await Visitor.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );

  // 2. Fetch Dashboard Stats
  const totalVisitors = await Visitor.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);
  
  const totalUsers = await User.countDocuments();
  const totalDestinations = await Destination.countDocuments();

  return NextResponse.json({
    visitors: totalVisitors[0]?.total || 0,
    users: totalUsers,
    destinations: totalDestinations
  });
}
