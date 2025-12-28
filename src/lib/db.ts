import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Increase timeout to avoid long waits if IP is blocked
      serverSelectionTimeoutMS: 5000, 
    };

    console.log("-----------------------------------");
    console.log("Attempting to connect to MongoDB...");
    
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully!");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        // Common error hints
        if (err.message.includes('bad auth')) console.error("HINT: Your username or password in .env.local is wrong.");
        if (err.message.includes('ECONNREFUSED')) console.error("HINT: Your IP is blocked. Go to Network Access in Atlas and allow 0.0.0.0/0");
        throw err;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
