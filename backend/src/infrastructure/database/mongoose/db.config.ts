import mongoose from "mongoose";

const database = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    mongoose.connection.on("connected",()=>{
      console.log("Database Connected Successfully ✅");
    })

    await mongoose.connect(process.env.MONGO_URI)
    
    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Database Connection Failed! ❌", errorMessage);
    throw error; 
  }
};

export default database;