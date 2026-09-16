const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hellow",
  });
});

app.use("/api", userRoutes);

module.exports = app;
