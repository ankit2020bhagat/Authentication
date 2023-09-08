const mongoose = require("mongoose");
const db = process.env.MONGO_URL;
const localurl = "mongodb://127.0.0.1:27017";
const connectDB = async () => {
  try {
    await mongoose.connect(localurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
module.exports = connectDB;
