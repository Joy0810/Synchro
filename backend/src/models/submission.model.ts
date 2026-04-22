import mongoose, {Document, Schema} from "mongoose";

export interface ISubmission extends Document{
    assignment:mongoose.Types.ObjectId;
    group?:mongoose.Types.ObjectId | null;
    confirmedBy:mongoose.Types.ObjectId;
    confirmedAt:Date;
    submissionLink:string;
    submissionStatus:"pending"|"confirmed"|"overdue";
}

const submissionSchema=new Schema<ISubmission>({
    assignment:{type:mongoose.Schema.Types.ObjectId,ref:"Assignment",required:true},
    group:{type:mongoose.Schema.Types.ObjectId,ref:"Group",default:null,required:false},
    confirmedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    confirmedAt:Date,
    submissionLink:{type:String,required:true},
    submissionStatus:{type:String,enum:["pending","confirmed","overdue"],default:"pending"},
},{timestamps:true});

// submissionSchema.index({assignment:1,group:1},{unique:true});

export const SubmissionModel=mongoose.model<ISubmission>("Submission",submissionSchema);