const express=require("express");
const router=express.Router();
const QuizController=require("./../Controller/quizController");
const authController=require("./../Controller/authController");
router.route("/").post(authController.checkAdmin,QuizController.addQuiz).get(QuizController.getQuizzes);
router.route("/:id").put(QuizController.editQuiz).delete(QuizController.deleteQuiz).get(QuizController.getQuiz);
router.route("/submit").post(QuizController.submitQuiz);
router.route("/analytics").post(QuizController.getAnalytics);
module.exports=router;