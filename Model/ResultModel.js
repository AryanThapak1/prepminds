const mongoose = require("mongoose");

const resultSchema=new mongoose.Schema({
    userID:{
        type:String,
        required:[true,"A user must have an id"]
    },
    results:[
        {
            quizID:{
                type:mongoose.Types.ObjectId,
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