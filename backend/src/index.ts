import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import groupRoutes from "./routes/group.routes";
import assignmentRotues from "./routes/assignment.routes";
import submissionRoutes from "./routes/submission.routes";
import analyticsRoutes from './routes/analytics.routes';
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app=express();
const PORT=process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({sucess:true,message:"Server is healthy"});
})

app.use("/api/auth",authRoutes);
app.use("/api/groups",groupRoutes);
app.use("/api/assignments",assignmentRotues);
app.use("/api/submissions",submissionRoutes);
app.use("/api/analytics",analyticsRoutes);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})