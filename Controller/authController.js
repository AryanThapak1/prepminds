const user = require("./../Model/UserModel");
const sendEmail=require("./../utils/nodeMailer")
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const url=require('./../utils/url');

exports.signup = catchAsync(async (req, res, next) => {
  const User = req.body;
  const newUser = await user.create(User);
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
  newUser.Password = null;
  res.status(200).json({
    status: "Success",
    token,
    data: {
      user: newUser,
    },
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const User = await user.findOne({ email }).select("+Password");
  if (!User) {
    return res.status(404).json({
      status: "Doesn't Exist",
    });
  }
  const password = req.body.password;
  const userPassword = User.Password;
  const isAuthenticated = await User.correctPassword(password, userPassword);
  if (!isAuthenticated) {
    return res.status(401).json({
      status: "Unauthorized",
    });
  }

  const token = jwt.sign({ email }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });

  User.Password=undefined;
  res.cookie("token",token,{
    httpOnly:true
  })
  res.status(200).json({
    status: "Success",
    token: token,
    data: {
      User,
    },
  });

  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const exisitingUser = await user.findOne({ email });
  if (!exisitingUser) {
    return res.status(404).json({
      status: "Failed",
      message: "User Doesn't exists",
    });
  }

  const passwordResetToken = exisitingUser.createPasswordResetToken();
  exisitingUser.passwordResetToken=passwordResetToken;
  await exisitingUser.save({validateBeforeSave:false});
  const resetURL=`${url}/${req.url}/${passwordResetToken}`
  const text=`Forgot Your Password ? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
   If you didn't forget your password,please ignore this email`;

   try{
    sendEmail({
        email:email,
        text,
        subject:"Forgot your Password ?"
    })

    res.status(200).json(
        {status:"Success"}
    )
   }

   catch(err){
    exisitingUser.passwordResetExpires=undefined;
    exisitingUser.passwordResetToken=undefined;
    await exisitingUser.save({validateBeforSave:false})
    console.log(err);
    return res.status(500).json({
        status:"failed",
        message:"There was an error while sending email pls try again later"
    })
   }

   next();

});


exports.changePassword=catchAsync(async(req,res,next)=>{
    const passwordResetToken=req.params.id;
    const User=await user.findOne({passwordResetToken});
    if(!User){
        return res.status(403).json({
            status:"Failed",
            message:"Wrong reset token"
        })
    }

    if(Date.now()>User.passwordResetExpires){
        return res.status(500).json({
            status:"Failed",
            message:"Token is expired"
        })
    }
    const newPassword=req.body.password
    User.Password=newPassword;
    User.passwordResetToken=undefined;
    User.passwordResetExpires=undefined;
    await User.save({validateBeforeSave:false});

    res.status(200).json({
        status:"Success",
        message:"password change successfully"
    })

    next();

})

exports.checkForToken=catchAsync(async(req,res,next)=>{
  if(!req.headers.authorization||!req.headers.authorization.startsWith('bearer')){
    return res.status(401).json({
      status:"Failed",
      message:"Unauthorised"
    })
  }

  const token=req.headers.authorization.split(" ")[1];
  if(!token){
    return res.status(404).json({
      status:"Failed",
      message:"Token Not Found"
    })
  }

  const isTokenVerified=await jwt.verify(token,process.env.JWT_Secret);
  if(!isTokenVerified){
    return res.status(403).json({
      status:"Failed",
      message:"Not a vaild Token"
    })
  }

  res.status(200).json({
    status:"Success"
  })

  next();
})