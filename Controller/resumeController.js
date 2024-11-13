const getEmail = require("../utils/decodeToken");
const Resume=require("./../Model/ResumeModel");
const catchAsync=require("./../utils/catchAsync");
const User=require("./../Model/UserModel")

exports.checkResume=catchAsync(async(req,res,next)=>{
    const id=req.params.id;
    const resume=await Resume.findById(id);

    res.status(200).json({
        status:"Successful",
        resume:{
            resume
        }
    })

    next();
})

exports.getAllResume=catchAsync(async(req,res,next)=>{
    const email=getEmail(req);
    const user=await User.findOne({email}).populate("Resume");
    res.status(200).json({
        message:"Successful",
        data:{
            resumes:user.Resume
        }
    })

    next();
})
exports.createResume=catchAsync(async(req,res,next)=>{

    const resume=req.body.resume;
    const newResume=await Resume.create(resume);
    const email=getEmail(req);
    const user=await User.findOne({email});
    user.Resume.push(newResume._id);
    await user.save();
    res.status(200).json({
        Status:"Successful",
        message:"Created Successfully"
    }); 

    next();
});

exports.editResume=catchAsync(async(req,res,next)=>{
    const resume=req.body.resume;
    const updatedResume=await Resume.findByIdAndUpdate(resume.id,resume,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"Successful",
        data:{
            updatedResume
        }
    })

    next();
})

exports.deleteResume=catchAsync(async(req,res,next)=>{
    const resumeID=req.params.id;
    await Resume.deleteOne({_id:resumeID});
    res.status(200).json({
        status:"Succesful",
        message:"Deleted"
    })
    next();
})

