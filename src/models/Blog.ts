import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true }, // Short summary
  image: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true }, // Store as string for flexibility (e.g. "Oct 12")
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
