import { AssignmentModel } from "../models/assignment.model";
import { AppError } from "../middleware/error.middleware";
import { GroupModel } from "../models/group.model";

export const createAssignment=async(
    title:string,
    description:string,
    dueDate:string,
    driveLink:string|null,
    createdBy:string,
    assignedTo:"all"|"specific",
    courseId?:string,
    groupIds?:string[]
)=>{
    if(assignedTo==="specific" && (!groupIds||groupIds.length===0)){
        throw new AppError(400,"Group IDs are required when assignedTo is 'specific'");
    }
    const assignment=await AssignmentModel.create({
        title,
        description,
        dueDate,
        driveLink,
        createdBy,
        course:courseId||null,
        assignedTo,
        assignedGroups:assignedTo==='specific'?groupIds:[],
    });
    return assignment;
}

export const getMyAssignmets=async(role:string,userId:string)=>{
  if(role==="admin"){
    return AssignmentModel.find()
      .populate("createdBy","name email")
      .populate("course","title courseCode")
      .populate("assignedGroups","name");
  }
  const groups=await GroupModel.find({members:userId}).select("_id");
  const groupIds=groups.map(g=>g._id);
  return AssignmentModel.find({
    $or:[
      {assignedTo:"all"},
      {assignedTo:"specific",assignedGroups:{$in:groupIds}},
    ]
  })
    .populate("createdBy","name email")
    .populate("course","title courseCode")
    .populate("assignedGroups","name");
};

export const editAssignment=async(
    assignmentId:string,
    title:string,
    description:string,
    dueDate:string,
    driveLink:string|null,
    assignedTo:"all"|"specific",
    groupIds?:string[],
    courseId?:string|null
)=>{
  const assignment=await AssignmentModel.findById(assignmentId);
  if(!assignment){
    throw new AppError(404,"Assignment not found");
  }
  assignment.title=title;
  assignment.description=description;
  assignment.dueDate=new Date(dueDate);
  assignment.driveLink=driveLink;
  assignment.assignedTo=assignedTo;
  assignment.assignedGroups = assignedTo === 'specific' ? (groupIds as any) : [];
  assignment.course = courseId ? (courseId as any) : null; 
  await assignment.save();
  return assignment;
}

export const getAssignmentByCourse=async(
    courseId:string,
    userId:string,
    role:string
)=>{
  if(role==="admin"){
    return AssignmentModel.find({course:courseId})  
      .populate("createdBy","name email")
      .populate("course","title courseCode")
      .populate("assignedGroups","name");
  }
  const groups=await GroupModel.find({members:userId,course:courseId}).select("_id");
  const groupIds=groups.map(g=>g._id);
  return AssignmentModel.find({
    course:courseId,
    $or:[
      {assignedTo:"all"},
      {assignedTo:"specific",assignedGroups:{$in:groupIds}},
    ]
  })
    .populate("createdBy","name email")
    .populate("course","title courseCode")
    .populate("assignedGroups","name");
};

export const removeAssignment=async(assignmentId:string)=>{
  const assignment=await AssignmentModel.findById(assignmentId);
  if(!assignment){
    throw new AppError(404,"Assignment not found");
  }
  await AssignmentModel.findByIdAndDelete(assignmentId);
  return {message:"Assignment removed successfully"};
}