import express from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bodyParser from "body-parser";
import cors from "cors";
// import connectDB from "./config/db.js";
import faqRoutes from "./routes/faqRoutes.js";
import { config } from "dotenv";

config({
  path: "./.env",
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
import 'dotenv/config';


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use(express.static(path.join(__dirname, "public")));

// Serve the editor page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "editor.html"));
});

app.use("/api/faqs", faqRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
