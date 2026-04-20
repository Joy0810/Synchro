import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:"student"|"admin";
    enrolledCourses:mongoose.Types.ObjectId[];
    createdAt:Date;
}

const userSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["student","admin"],required:true},
    enrolledCourses:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"}],   
},{timestamps:true}
);

export const UserModel=mongoose.model<IUser>("User",userSchema);