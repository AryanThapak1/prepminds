const catchAsync = require("../utils/catchAsync");
const getEmail = require("../utils/decodeToken");
const User=require("./../Model/UserModel");

exports.getAllUsers=catchAsync(async(req,res,next)=>{

})

exports.updateUser=catchAsync(async(req,res,next)=>{

})

exports.deleteUser=catchAsync(async(req,res,next)=>{

})

exports.getProfile = catchAsync(async (req, res, next) => {

    const email = getEmail(req);
   
    const user = await User.findOne({ email }).select('-Password'); // Exclude password from the response
    
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found"
      });
    }
  
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  });

  