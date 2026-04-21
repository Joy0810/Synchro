import { SubmissionModel } from '../models/submission.model';
import { AssignmentModel } from '../models/assignment.model';
import { GroupModel } from '../models/group.model';
import { AppError } from '../middleware/error.middleware';

export const submitAssignment = async (
  assignmentId: string,
  groupId: string,
  userId: string,
  submissionLink: string
) => {
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) throw new AppError(404, 'Assignment not found');

  const group = await GroupModel.findById(groupId);
  if (!group) throw new AppError(404, 'Group not found');

  // only group leader can confirm
  if (group.owner.toString() !== userId)
    throw new AppError(403, 'Only the group leader can confirm submission');

  // check assignment is visible to this group
  if (assignment.assignedTo === 'specific') {
    const isAssigned = assignment.assignedGroups.map(g => g.toString()).includes(groupId);
    if (!isAssigned) throw new AppError(403, 'This assignment is not assigned to your group');
  }

  // check for duplicate
  const existing = await SubmissionModel.findOne({ assignment: assignmentId, group: groupId });
  if (existing) throw new AppError(409, 'Assignment already submitted by this group');

  const submission = await SubmissionModel.create({
    assignment: assignmentId,
    group: groupId,
    confirmedBy: userId,
    confirmedAt: new Date(),
    submissionLink,
    submissionStatus: 'confirmed',
  });
  return submission;
};

export const getGroupSubmissions = async (groupId: string, userId: string) => {
  const group = await GroupModel.findById(groupId);
  if (!group) throw new AppError(404, 'Group not found');

  const isMember = group.members.map(m => m.toString()).includes(userId);
  if (!isMember) throw new AppError(403, 'You are not a member of this group');

  const submissions = await SubmissionModel.find({ group: groupId })
    .populate('assignment', 'title dueDate driveLink course')
    .populate('confirmedBy', 'name email');

  const now = new Date();
  return submissions.map(sub => {
    const assignment = sub.assignment as any;
    const effectiveStatus =
      sub.submissionStatus === 'confirmed'
        ? 'confirmed'
        : now > new Date(assignment.dueDate)
        ? 'overdue'
        : 'pending';
    return { ...sub.toObject(), submissionStatus: effectiveStatus };
  });
};

export const getAllSubmissionsAdmin = async () => {
  return SubmissionModel.find()
    .populate('assignment', 'title dueDate course')
    .populate('group', 'name')
    .populate('confirmedBy', 'name email');
};