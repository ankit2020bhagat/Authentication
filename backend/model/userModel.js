const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Your Email is required"],
    unique: true,
  },
  username: {
    type: String,
    require: [true, "your name is required"],
  },
  password: {
    type: String,
    require: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
module.exports = mongoose.model("User", userSchema);
