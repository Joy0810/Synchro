import mongoose, {Document,Schema} from "mongoose";

export interface IAssignment extends Document{
    title:string;
    description:string;
    dueDate:Date;
    driveLink:string|null;
    createdBy:mongoose.Types.ObjectId;
    course:mongoose.Types.ObjectId|null;
    assignedTo:"all"|"specific";
    assignedGroups:mongoose.Types.ObjectId[];
    createdAt:Date;
}

const assignmentSchema=new Schema<IAssignment>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    dueDate:{type:Date,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",default:null},
    assignedTo:{type:String,enum:["all","specific"],required:true},
    assignedGroups:[{type:mongoose.Schema.Types.ObjectId,ref:"Group"}],
    driveLink:{type:String,required:false},
},{timestamps:true
})

export const AssignmentModel=mongoose.model<IAssignment>("Assignment",assignmentSchema);