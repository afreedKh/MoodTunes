import mongoose from "mongoose";

const database = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database Connected Successfully ✅");
  } catch (error: any) {
    console.error("Database Connection Failed! ❌", error.message);
  }
};

export default database;