import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { config } from "./infrastructure/config/app.config";
import database from "./infrastructure/database/mongoose/db.config";
import moodRoutes from "./presentation/routes/mood.route";

const app = express();
app.use(express.json());
app.use("/api", moodRoutes);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    await database();
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`Server running on ${config.BASE_URL} ✅`);
      } else {
        console.log(`Server Started ✅`);
      }
    });
  } catch (error: any) {
    console.error("Server failed to connect! ❌", error.message);
  }
};

startServer();