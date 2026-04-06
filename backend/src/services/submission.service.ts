import {
  createSubmission,
  getSubmissionByAssignmentAndGroup,
  getSubmissionsByGroup,
  getAllSubmissions,
  isAssignmentVisibleToGroup,
} from '../models/submission.model';
import { getGroupById, getGroupMembers } from '../models/group.model';
import { getAssignmentById } from '../models/assignment.model';
import { AppError } from '../middleware/error.middleware';

export const submitAssignment = async (
  assignment_id: string,
  group_id: string,
  userId: string,
  submission_link: string
) => {
  const assignment = await getAssignmentById(assignment_id);
  if (!assignment) throw new AppError(404, 'Assignment not found');

  const group = await getGroupById(group_id);
  if (!group) throw new AppError(404, 'Group not found');

  const members = await getGroupMembers(group_id);
  const isMember = members.some(m => m.id === userId);
  if (!isMember) throw new AppError(403, 'You are not a member of this group');

  if (assignment.assigned_to === 'specific') {
    const visible = await isAssignmentVisibleToGroup(assignment_id, group_id);
    if (!visible) throw new AppError(403, 'This assignment is not assigned to your group');
  }

  const existing = await getSubmissionByAssignmentAndGroup(assignment_id, group_id);
  if (existing) throw new AppError(409, 'Assignment already submitted by this group');

  if (new Date() > new Date(assignment.due_date))
    throw new AppError(400, 'Assignment due date has passed');

  return createSubmission(assignment_id, group_id, userId, submission_link);
};

export const getGroupSubmissions = async (group_id: string, userId: string) => {
  const group = await getGroupById(group_id);
  if (!group) throw new AppError(404, 'Group not found');

  const members = await getGroupMembers(group_id);
  const isMember = members.some(m => m.id === userId);
  if (!isMember) throw new AppError(403, 'You are not a member of this group');

  return getSubmissionsByGroup(group_id);
};

export const getAllSubmissionsAdmin = async () => {
  return getAllSubmissions();
};