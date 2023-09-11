const User = require("../model/user");
const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res
        .status(201)
        .json({ message: "User deleted successfully", data });
    }
  } catch (err) {
    console.log(err);
    re.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = deleteUser;
