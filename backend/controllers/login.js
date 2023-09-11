const { validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const createSecretToken = require("../utils/token");
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: { message: "Too many login attempts. Please try again later" },
});

const Login = async (req, res) => {
  try {
    // let txn = await loginLimiter(req, res);
    // console.log(txn);
    // // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
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
      return res.json({ message: "Incorrect password " });
    }
    const token = createSecretToken(user._id);
    return res.stauts(200).json({ token: token, username: user.username });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { Login, loginLimiter };
