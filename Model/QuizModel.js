const mongoose=require("mongoose");

const quizSchema=new mongoose.Schema({
    quizId:{
        type:String,
        required:[true,"Enter a quiz id"]
    },

    questions:{
        type:mongoose.Types.ObjectId,
        ref:'Question',
        required:[true,"A quiz must have questions"]
    }
})


const quizModel=mongoose.Model('Quiz',quizSchema);

module.exports=quizModel;