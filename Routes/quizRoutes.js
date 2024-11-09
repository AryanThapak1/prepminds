const express=require("express");
const router=express.Router();
const QuizController=require("./../Controller/quizController");

router.route("/").post(QuizController.addQuiz).get(QuizController.getQuizzes);
router.route("/:id").put(QuizController.editQuiz).delete(QuizController.deleteQuiz).get(QuizController.getQuiz);

module.exports=router;