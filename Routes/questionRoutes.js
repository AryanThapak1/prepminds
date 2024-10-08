const express = require("express");
const { addQuestions } = require("../Controller/questionController");
const router = express.Router();

router.route("/").post(addQuestions);

module.exports = router;