const catchAsync = require("../utils/catchAsync");
const Quiz=require("./../Model/QuizModel");
const Result =require("./../Model/ResultModel")
const jwt=require("jsonwebtoken");
exports.getQuizzes=catchAsync(async(req,res,next)=>{
    const quizzes=await Quiz.find();
    res.status(200).json({
        message:"Successful",
        data:{
            quizzes
        }
    })
})
exports.addQuiz=catchAsync(async(req,res,next)=>{
    const quiz=req.body.quiz;
    console.log(quiz);
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
    const quiz=await Quiz.findById(id).populate("questions");
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
    const updatedQuiz=await Quiz.findRyIdAndUpdate(id,quiz,{
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


exports.submitQuiz = catchAsync(async (req, res, next) => {
    // Check if Authorization header exists and is in the correct format
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            status: "Failed",
            message: "Unauthorized"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    // Check if token is present
    if (!token) {
        return res.status(404).json({
            status: "Failed",
            message: "Token Not Found"
        });
    }

    // Verify the token
    const isTokenVerified = await jwt.verify(token, process.env.JWT_Secret);
    if (!isTokenVerified) {
        return res.status(403).json({
            status: "Failed",
            message: "Not a valid Token"
        });
    }

    // Decode the token to get the user's email or userID
    const decoded = jwt.decode(token, process.env.JWT_Secret);
    const email = decoded.email;  // Assuming `email` is stored in the token

    // Ensure the user data exists in the request body
    const data = req.body.data;

    // Create the final result object
    const finalResult = {
        userID: email, // Assuming the user's email is used as their unique ID
        results: data, // This can be an array of quiz results (or any other structured data)
    };

    // Create a new result document
    const result = await Result.create(finalResult);

    // Send the response with the created result
    res.status(200).json({
        status: "Successful",
        data: {
            result
        }
    });

    next(); // Optionally move to the next middleware
});

