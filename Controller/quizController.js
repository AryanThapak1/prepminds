const catchAsync = require("../utils/catchAsync");
const Quiz=require("./../Model/QuizModel");


exports.addQuiz=catchAsync(async(req,res,next)=>{
    const quiz=req.body.quiz;
    const newQuiz=await Quiz.create(quiz);
    res.status(200).json({
        status:"Success",
        data:{
            quiz:newQuiz
        }
    })

    next();
})

exports.getQuiz=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const quiz=await Quiz.findbyId(id).populate("questions");
    if(!quiz){
        return res.status(404).json({
            status:"Failed",
            messages:"Quiz Not Found"
        })
    }

    res.status(200).json({
        status:"Successful",
        data:{
            quiz
        }
    })

    next();

})


exports.editQuiz=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const quiz=req.body.quiz;
    const updatedQuiz=await Quiz.findbyIdAndUpdate(id,quiz,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"Success",
        data:{
            quiz:updatedQuiz
        }
    })

    next();

})

exports.deleteQuiz=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const deletedQuiz=await Quiz.findbyIdAndDelete(id);
    res.status(200).json({
        status:"Success",
    })

    next();

})

