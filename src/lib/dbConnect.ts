
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "edtechcart_dev"; // Specify the database name here

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
    const opts = {
      bufferCommands: false,
      dbName: DB_NAME, // Specify the database name in the connection options
    };
    console.log(`🔄 Creating new MongoDB connection promise to database: ${DB_NAME}`);
    // Mongoose will append the dbName to the URI if it's not already there
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
