const User = require("../model/userModel");
require("dotenv").config();
const Token_Key = process.env.TOKEN_KEY;
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, Token_Key, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "failed to verify" });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
module.exports = { userVerification };
