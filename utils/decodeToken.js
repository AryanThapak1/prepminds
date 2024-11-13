const catchAsync = require("./catchAsync");
const jwt=require("jsonwebtoken");
const getEmail=(req)=>{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      const email = decoded.email; // Assuming `email` is stored in the token
      return email;
}

module.exports=getEmail