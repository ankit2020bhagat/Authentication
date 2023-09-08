const {
  Signup,
  Login,
  deleteUser,
  getUser,
} = require("../controllers/AuthController");
const { userVerification } = require("../Middleware/AuthMiddlwWare");
const router = require("express").Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.delete("/:id", deleteUser);
router.get("/", getUser);

module.exports = router;
