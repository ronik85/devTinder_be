const express = require("express");

const app = express();
app.use("/rest", (req, res) => {
  res.send("hello from the serssver");
});
app.listen(3000, () => console.log("Server has started"));
