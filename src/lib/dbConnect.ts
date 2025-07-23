import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS Global type with the mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("🚀 Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    // The MONGODB_URI should already contain the database name.
    const opts = {
      bufferCommands: false,
    };
    console.log(`🔄 Creating new MongoDB connection promise...`);
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log("✅ New MongoDB connection established.");
      return mongooseInstance;
    }).catch(error => {
      console.error("🔴 MongoDB connection promise error:", error);
      cached.promise = null; 
      throw error;
    });
  }

  try {
    console.log("⏳ Awaiting MongoDB connection promise...");
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("🔴 Failed to establish MongoDB connection from promise:", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
