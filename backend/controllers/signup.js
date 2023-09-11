const { body, validationResult } = require("express-validator");
const User = require("../model/user");
const validateSignup = [
  body("email").isEmail().withMessage("Invalid email address"),

  body("username")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
const Signup = async (req, res) => {
  try {
    await Promise.all(validateSignup.map((validation) => validation.run(req)));
    const { email, username, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });

    if (user) {
      return res.status(201).json({ message: "User created auccessfully" });
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { Signup, validateSignup };
