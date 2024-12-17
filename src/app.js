const express = require("express");
const connectDB = require("./config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => console.log("Server has started"));
  })
  .catch(() => {
    console.log("Database connection failed");
  });
