const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Server jalan
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
