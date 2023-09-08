const User = require("../model/userModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const Signup = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });

    if (user) {
      res.send({ message: "User created auccessfully", status: true });
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ massage: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email " });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ mesage: "Incorrect password " });
    }
    const token = createSecretToken(user._id);
    res.send({ token: token, status: true, username: user.username });
    next();
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ mesage: "User not found" });
  }
  res.json({ message: "User deleted successfully ", data });
};

const getUser = async (req, res) => {
  const data = await User.find();
  res.json(data);
};
module.exports = { Signup, Login, deleteUser, getUser };
