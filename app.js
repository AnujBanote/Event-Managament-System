// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./models");

// -------- Route imports --------
const authRoutes    = require("./routes/auth.routes");
const eventRoutes   = require("./routes/event.routes");
const bookingRoutes = require("./routes/booking.routes");
const adminRoutes   = require("./routes/admin.routes");
const userRoutes    = require("./routes/user.routes");   // ✅ user routes
// --------------------------------

const app = express();

/* ---------- Global middleware ---------- */
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

/* ---------- Mount API routes ---------- */
app.use("/api/auth",     authRoutes);
app.use("/api/user",     userRoutes);    // ✅ /api/user/*
app.use("/api/events",   eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin",    adminRoutes);

/* ---------- Health‑check route ---------- */
app.get("/", (_req, res) => {
  res.send("🎉 Event Management System API Running");
});

/* ---------- DB connect & sync ---------- */
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

sequelize.sync({ alter: true })  // use { force: true } only for dev resets
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ Model sync failed:", err));

/* ---------- Start server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
