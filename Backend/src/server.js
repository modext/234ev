require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const stationsRouter = require("./routes/stations");
const shopsRouter = require("./routes/shops");
const tipsRouter = require("./routes/tips");
const submissionsRouter = require("./routes/submissions");

const app = express();

app.use(helmet());
app.use(cors()); // tighten to your app's origin(s) before production launch
app.use(express.json());

// Basic protection against abuse on write endpoints (submissions, reviews, reports)
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { error: "Too many requests, please slow down." },
});
app.use(["/api/submissions", "/api/stations/*/report", "/api/shops/*/reviews"], writeLimiter);

app.get("/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/stations", stationsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/tips", tipsRouter);
app.use("/api/submissions", submissionsRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// Centralized error handler so route handlers can just throw
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`234ev API running on port ${PORT}`));
