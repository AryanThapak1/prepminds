const express = require("express");
const { addQuestions, getQuestions } = require("../Controller/questionController");
const router = express.Router();

router.route("/").post(addQuestions).get(getQuestions);

module.exports = router;