import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import tasksRouter from "./routes/tasks.js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api/tasks", tasksRouter);

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Correct variable names
const { MONGO_URI, PORT } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT || 3000, () => {
      console.log(`Server listening on http://localhost:${PORT || 3000}`);
    });
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1);
  }
})();
