import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  guests: { type: Number, default: 1 },
  totalPrice: { type: String, required: true }, // Store as "$150"
  status: { type: String, default: 'Confirmed', enum: ['Pending', 'Confirmed', 'Cancelled'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
