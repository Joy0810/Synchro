import mongoose, {Document, Schema} from "mongoose";

export interface IGroup extends Document{
    name:string;
    owner:mongoose.Types.ObjectId;
    members:mongoose.Types.ObjectId[];
    course:mongoose.Types.ObjectId|null;
    createdAt:Date;
}

const groupSchema=new Schema<IGroup>({
    name:{type:String,required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",default:null},
},{timestamps:true}
);

export const GroupModel=mongoose.model<IGroup>("Group",groupSchema);
