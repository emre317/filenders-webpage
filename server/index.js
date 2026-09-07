const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend çalışıyor",
  });
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} adresinde çalışıyor`);
});