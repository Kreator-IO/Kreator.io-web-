import mongoose from 'mongoose';
import config from './index.js';

let connectionPromise;

const connectDB = async (retries = 3) => {
  if (!config.mongoUri) {
    console.warn('MONGO_URI is not configured. Skipping MongoDB connection.');
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    for (let attempt = 1; attempt <= retries; attempt += 1) {
      try {
        const conn = await mongoose.connect(config.mongoUri, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn.connection;
      } catch (error) {
        console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
        if (attempt === retries) {
          if (config.env === 'production') process.exit(1);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
    return null;
  })().finally(() => {
    connectionPromise = null;
  });

  return connectionPromise;
};

mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected.');
});

export default connectDB;
