import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // Stored as string to allow "$80"
  image: { type: String, required: true },
  rating: { type: String, default: '4.5' },
  featured: { type: Boolean, default: false },
});

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
