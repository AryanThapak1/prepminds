const catchAsync = require("../utils/catchAsync");
const Question = require("./../Model/QuestionModel");

exports.getQuestions=catchAsync(async(req,res,next)=>{
    const questions=await Question.find();
    res.status(200).json({
        status:"Successful",
        data:{
            questions
        }
    })
    next();
})
exports.addQuestions = catchAsync(async (req, res, next) => {
  const questions = req.body.questions;
  const Questions = await Question.create(questions);
  res.status(200).json({ status: "Success", data:{
    Questions
  }});
  next();
});



exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const questionId=req.body.id;
  await Question.findByIdAndDelete(questionId);
  res.status(200).json({
    status:"Success",
  }
  )
  next();
});

exports.editQuestion = catchAsync(async (req, res, next) => {
  const question=req.body.question;
  const updatedQuestion=await Question.findByIdAndUpdate(request.id,question,{
    new:true,
    runValidators:true
  })
  next();
});
