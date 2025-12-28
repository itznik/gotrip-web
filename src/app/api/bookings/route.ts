import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // To get user ID from token
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Destination from '@/models/Destination'; // Needed for population

// GET: Fetch bookings (If Admin -> All; If User -> Only theirs)
export async function GET(req: Request) {
  try {
    const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    await connectDB();

    let bookings;
    if (payload.role === 'admin') {
      // Admin sees ALL bookings + User details
      bookings = await Booking.find({})
        .populate('destination')
        .populate('user', 'username email') // Get user name/email
        .sort({ createdAt: -1 });
    } else {
      // Users see ONLY their bookings
      bookings = await Booking.find({ user: payload.id })
        .populate('destination')
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST: Create a new booking
export async function POST(req: Request) {
  try {
    const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const body = await req.json(); // { destinationId, date, guests, totalPrice }
    await connectDB();

    const newBooking = await Booking.create({
      user: payload.id,
      destination: body.destinationId,
      date: body.date,
      guests: body.guests,
      totalPrice: body.totalPrice,
      status: 'Confirmed'
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}
