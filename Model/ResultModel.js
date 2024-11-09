const mongoose = require("mongoose");

const resultSchema=new mongoose.Schema({
    userID:{
        type:String,
        required:[true,"A user must have an id"]
    },
    results:[
        {
            quizID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiz'
            },
            Score:{
                type:Number
            },
            takenAt:{
                type:Date,
                default:Date.now
            }
        }
    ]

})

const resultModel=mongoose.model("Result",resultSchema,"Result");

module.exports=resultModel;