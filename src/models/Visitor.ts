import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Format: "YYYY-MM-DD"
  count: { type: Number, default: 0 },
});

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
