import mongoose, {Document,Schema} from "mongoose";

export interface ICourse extends Document{
    title:string;
    description:string;
    courseCode:string;
    createdBy:mongoose.Types.ObjectId;
    enrolledStudents:mongoose.Types.ObjectId[];
    createdAt:Date;
}

const courseSchema=new Schema<ICourse>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    courseCode:{type:String,required:true,unique:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    enrolledStudents:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
},{timestamps:true});

export const CourseModel=mongoose.model<ICourse>("Course",courseSchema);