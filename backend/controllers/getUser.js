const User = require("../model/user");

const getUser = async (req, res) => {
  const data = await User.find();
  res.status(200).json(data);
};
module.exports = { getUser };
