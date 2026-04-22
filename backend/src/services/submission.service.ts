import { SubmissionModel } from '../models/submission.model';
import { AssignmentModel } from '../models/assignment.model';
import { GroupModel } from '../models/group.model';
import { AppError } from '../middleware/error.middleware';

export const submitAssignment = async (
  assignmentId: string,
  groupId: string | null | undefined,
  userId: string,
  submissionLink: string
) => {
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) throw new AppError(404, 'Assignment not found');

  if (assignment.assignedTo === 'specific') {
    if (!groupId) throw new AppError(400, 'Group ID is required for this assignment');
    
    const group = await GroupModel.findById(groupId);
    if (!group) throw new AppError(404, 'Group not found');

    // only group leader can confirm
    if (group.owner.toString() !== userId)
      throw new AppError(403, 'Only the group leader can confirm submission');

    // check assignment is visible to this group
    const isAssigned = assignment.assignedGroups.map(g => g.toString()).includes(groupId);
    if (!isAssigned) throw new AppError(403, 'This assignment is not assigned to your group');

    // check for duplicate by this group
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
  } else {
    // assignedTo === "all"
    // check for duplicate by this user individually
    const existing = await SubmissionModel.findOne({ 
      assignment: assignmentId, 
      confirmedBy: userId 
    });
    if (existing) throw new AppError(409, 'You have already submitted this assignment');

    const submission = await SubmissionModel.create({
      assignment: assignmentId,
      group: null,
      confirmedBy: userId,
      confirmedAt: new Date(),
      submissionLink,
      submissionStatus: 'confirmed',
    });
    return submission;
  }
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