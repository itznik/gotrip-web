import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Visitor from '@/models/Visitor';
import User from '@/models/User';
import Destination from '@/models/Destination';
import Blog from '@/models/Blog';

export async function GET() {
  await connectDB();
  
  const today = new Date().toISOString().split('T')[0];

  // 1. Increment Visitor Count (Silent update)
  await Visitor.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );

  // 2. Fetch Totals
  // Aggregate sums all counts from all documents
  const totalVisitorsResult = await Visitor.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);
  const totalVisitors = totalVisitorsResult[0]?.total || 0;
  
  const totalUsers = await User.countDocuments();
  const totalDestinations = await Destination.countDocuments();
  const totalBlogs = await Blog.countDocuments();

  // 3. Fetch Chart Data (Last 7 Days)
  // We sort by date descending, take 7, then reverse to show oldest-to-newest
  const chartDataRaw = await Visitor.find().sort({ date: -1 }).limit(7);
  const chartData = chartDataRaw.reverse().map(v => ({
    name: v.date.substring(5), // Remove Year (e.g., "12-25")
    visitors: v.count
  }));

  return NextResponse.json({
    totalVisitors,
    totalUsers,
    totalDestinations,
    totalBlogs,
    chartData
  });
}
