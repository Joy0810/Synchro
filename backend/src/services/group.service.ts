import { GroupModel } from "../models/group.model";
import { AppError } from "../middleware/error.middleware";
import { UserModel } from "../models/user.model";

export const createNewGroup=async(
    name:string,
    ownerId:string,
    courseId?:string
)=>{
    const group=await GroupModel.create({
      name,
      owner:ownerId,
      members:[ownerId],
      course:courseId||null,
    });
    return group;
};

export const getMyGroups=async(userId:string)=>{
  const groups=await GroupModel.find({members:userId})
    .populate("owner","name email")
    .populate("members","name email")
    .populate("course","title courseCode");
  return groups;
};

export const addMember=async(
  groupId:string,
  email:string,
  requesterId:string
)=>{
  const group=await GroupModel.findById(groupId);
  if(!group){
    throw new AppError(404,"Group not found");
  }
  if(group.owner.toString()!==requesterId){
    throw new AppError(403,"Only group owner can add members");
  }
  const user=await UserModel.findOne({email});
  if(!user){
    throw new AppError(404,"User not found");
  }
  if(group.members.map(m=>m.toString()).includes(user._id.toString())){
    throw new AppError(400,"User is already a member of the group");
  }
  group.members.push(user._id);
  await group.save();
  return {message:"Member added successfully"};
};

export const removeMember=async(
  groupId:string,
  memberId:string,
  requesterId:string
)=>{
  const group=await GroupModel.findById(groupId);
  if(!group){
    throw new AppError(404,"Group not found");
  }
  if(group.owner.toString()!==requesterId){
    throw new AppError(403,"Only group owner can remove members");
  }
  if(!group.members.map(m=>m.toString()).includes(memberId)){
    throw new AppError(400,"User is not a member of the group");
  }
  group.members=group.members.filter(m=>m.toString()!==memberId);
  await group.save(); 
  return {message:"Member removed successfully"};
};

export const removeGroup=async(
  groupId:string,
  requesterId:string,
  requesterRole:string
)=>{
  const group=await GroupModel.findById(groupId);
  if(!group){
    throw new AppError(404,"Group not found");
  }
  if(requesterRole!=="admin"&&group.owner.toString()!==requesterId){
    throw new AppError(403,"Only group owner or admin can remove the group");
  }
  await GroupModel.findByIdAndDelete(groupId);
  return {message:"Group removed successfully"};
};

export const fetchAllGroups=async()=>{
  return GroupModel.find()
    .populate("owner","name email")
    .populate("members","name email")
    .populate("course","title courseCode");
};

export const transferOwnership=async(
  groupId:string,
  newOwnerId:string,
  requesterId:string,
  requesterRole:string
)=>{
  const group=await GroupModel.findById(groupId);
  if(!group){
    throw new AppError(404,"Group not found");
  }
  if(requesterRole!=="admin"&&group.owner.toString()!==requesterId){
    throw new AppError(403,"Only group owner or admin can transfer ownership");
  }
  const newOwner=await UserModel.findById(newOwnerId);
  if(!newOwner){
    throw new AppError(404,"New owner user not found");
  }
  const isMember=group.members.map(m=>m.toString()).includes(newOwnerId);
  if(!isMember){
    throw new AppError(400,"New owner user is not a member of the group");
  }
  group.owner=newOwner._id;
  await group.save();
  return {message:"Group ownership transferred successfully"};
}