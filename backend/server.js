import "dotenv/config"; // Load env vars before other imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(
  cors({
    origin: "*", // change later for security
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===================== ROUTES ===================== */
app.use("/api", routes);

/* ===================== ERROR HANDLER ===================== */
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err);
  res.status(500).json({ message: err.message, stack: err.stack });
});

/* ===================== HEALTH CHECK ===================== */
app.get("/", (req, res) => {
  res.send("StudyPoint API is running 🚀");
});

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 9090;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1);
  }
};

start();
