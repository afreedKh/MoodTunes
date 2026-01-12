import mongoose from "mongoose";

const database = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log("Database Connected Successfully ✅");
    
    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Database Connection Failed! ❌", errorMessage);
    throw error; // Re-throw to prevent server from starting without DB
  }
};

export default database;