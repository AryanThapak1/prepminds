const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("../Routes/userRoutes");
const questionRouter = require("../Routes/questionRoutes");
const resumeRouter = require("../Routes/resumeRoutes");
const quizRouter = require("../Routes/quizRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true
}));
mongoose
  .connect(
    process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)
  )
  .then(() => {
    console.log("Data is connected");
  });
app.use("/api/v1/user", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/quiz", quizRouter);
app.get("/",(req,res,next)=>{
  res.send("<h1>Welcome</h1>");
  next();
})
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
