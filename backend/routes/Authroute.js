const { getUser } = require("../controllers/getUser");
const { Signup } = require("../controllers/signup");
const { Login } = require("../controllers/login");
const deleteUser = require("../controllers/delete");
const router = require("express").Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.delete("/:id", deleteUser);
router.get("/", getUser);

module.exports = router;
deleteUser;
