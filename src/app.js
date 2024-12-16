const express = require("express");

const app = express();
app.get("/hello", (req, res) => {
  res.send("hello get");
});
app.post("/hello", (req, res) => {
  res.send("hello post");
});
app.listen(3000, () => console.log("Server has started"));
