import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { config } from "./infrastructure/config/app.config";
import database from "./infrastructure/database/mongoose/db.config";
import moodRoutes from "./presentation/routes/mood.route";
import cors from "cors";

const app = express();
app.use(cors({ origin: config.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.params);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", moodRoutes);

// 404 handler for unmatched routes (must be last)
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: "Route not found", path: req.path, method: req.method });
});

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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Server failed to start! ❌", errorMessage);
    process.exit(1); // Exit with error code
  }
};

startServer();
