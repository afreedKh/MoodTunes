import mongoose from "mongoose";

const database = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected Successfully ✅");
    });
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error: any) {
    console.error("Database Connection Failed! ❌", error.message);
  }
};

export default database;