const mongoose = require("mongoose");

const resultSchema=new mongoose.Schema({
    userID:{
        type:String,
        required:[true,"A user must have an id"]
    },
    results:[
        {
            quizID:{
                type:String
            },
            Score:{
                type:Number
            },
            Total:{
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