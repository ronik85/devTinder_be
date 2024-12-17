const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ronikabrainerhub:wsA4XWuiYQbh5BPw@cluster0.fkdjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder"
  );
};
module.exports = connectDB;
