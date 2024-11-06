const express=require("express");
const router=express.Router();
const QuizController=require("./../Controller/quizController");

router.route("/").post(QuizController.addQuiz);
router.router("/:id").put(QuizController.editQuiz).delete(QuizController.deleteQuiz);

module.exports=router;