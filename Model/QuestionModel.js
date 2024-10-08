const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:[true,"A question must have a title"],
    },
    Option1:{
        type:String,
        required:true
    },
    Option2:{
        type:String,
        required:true
    },
    Options3:{
        type:String,
        required:true
    },
    Option4:{
        type:String,
        required:true
    },
    CorrectAnswer:{
        type:String,
        required:true
    }
})


const questionModel=mongoose.model("Question",questionSchema);

module.exports=questionModel;
