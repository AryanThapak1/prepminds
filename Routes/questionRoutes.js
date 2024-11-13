const express = require("express");
const { addQuestions, getQuestions } = require("../Controller/questionController");
const authController=require("./../Controller/authController")
const router = express.Router();

router.route("/").post(authController.checkAdmin,addQuestions).get(getQuestions);

module.exports = router;