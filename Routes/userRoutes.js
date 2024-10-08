const express = require("express");
const { signup, login, forgotPassword, changePassword } = require("./../Controller/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/forgotPassword/:id").post(changePassword);
module.exports = router;