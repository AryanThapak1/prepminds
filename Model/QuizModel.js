const mongoose=require("mongoose");

const quizSchema=new mongoose.Schema({
    quizId:{
        type:String,
        required:[true,"Enter a quiz id"]
    },

    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:[true,"A quiz must have questions"]
    }]
})


const quizModel=mongoose.model('Quiz',quizSchema);

module.exports=quizModel;