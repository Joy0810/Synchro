import {
  createGroup,
  getGroupByUserId,
  getGroupById,
  getGroupMembers,
  addMemberToGroup,
  removeMemberFromGroup,
  getAllGroups,
  deleteGroup,
  updateGroupOwner,
} from '../models/group.model';
import { findUserByEmail, findUserById } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';

export const createNewGroup = async (name: string, ownerId: string) => {
  return createGroup(name, ownerId);
};

export const getMyGroups = async (userId: string) => {
  const groups = await getGroupByUserId(userId);
  const withMembers = await Promise.all(
    groups.map(async (g) => ({
      ...g,
      members: await getGroupMembers(g.id),
    }))
  );
  return withMembers;
};

export const addMember = async (groupId: string, email: string, requesterId: string) => {
  const group = await getGroupById(groupId);
  if (!group) throw new AppError(404, 'Group not found');
  if (group.owner_id !== requesterId) throw new AppError(403, 'Only group owner can add members');

  const user = await findUserByEmail(email);
  if (!user) throw new AppError(404, 'User with that email not found');

  await addMemberToGroup(groupId, user.id);
  return { message: 'Member added successfully' };
};

export const removeMember = async (groupId: string, userId: string, requesterId: string) => {
  const group = await getGroupById(groupId);
  if (!group) throw new AppError(404, 'Group not found');
  if (group.owner_id !== requesterId) throw new AppError(403, 'Only group owner can remove members');
  if (userId === requesterId) throw new AppError(400, 'Owner cannot remove themselves');

  await removeMemberFromGroup(groupId, userId);
  return { message: 'Member removed successfully' };
};

export const removeGroup = async (groupId: string, requesterId: string, requesterRole: string) => {
  const group = await getGroupById(groupId);
  if (!group) throw new AppError(404, 'Group not found');
  if (requesterRole !== 'admin' && group.owner_id !== requesterId)
    throw new AppError(403, 'Only group owner or admin can delete group');
  await deleteGroup(groupId);
  return { message: 'Group deleted successfully' };
};

export const fetchAllGroups = async () => {
  return getAllGroups();
};

export const transferOwnership = async (
  groupId: string, 
  newOwnerId: string, 
  requesterId: string,
  requesterRole: string
) => {
  const group = await getGroupById(groupId);
  if (!group) throw new AppError(404, 'Group not found');
  if (requesterRole !== 'admin' && group.owner_id !== requesterId)
    throw new AppError(403, 'Only group owner or admin can transfer ownership');
  const newOwner = await findUserById(newOwnerId);
  if (!newOwner) throw new AppError(404, 'New owner not found');
  const members = await getGroupMembers(groupId);
  const isMember = members.some(m => m.id === newOwnerId);
  if (!isMember) throw new AppError(400, 'New owner must already be a group member');
  await updateGroupOwner(groupId, newOwnerId);
  return { message: 'Ownership transferred successfully' };
};