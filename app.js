const mongoose=require("mongoose");
const express=require("express");
const dotenv=require("dotenv");
const userRouter=require("./Routes/userRoutes");
const questionRouter=require("./Routes/questionRoutes");
dotenv.config();
const app=express();
app.use(express.json());
mongoose.connect(process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD)).then(()=>{
    console.log("Data is connected")
})
app.use('/api/v1/user',userRouter);
app.use('/api/v1/questions',questionRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}` )
})