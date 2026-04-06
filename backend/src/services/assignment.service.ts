import {
  createAssignment, linkAssignmentToGroups,
  getAssignmentById, getAllAssignments,
  getAssignmentsForStudent, updateAssignment,
  deleteAssignment,
} from '../models/assignment.model';
import { AppError } from '../middleware/error.middleware';

export const createNewAssignment = async (
  title: string,
  description: string,
  due_date: string,
  drive_link: string | null,
  createdBy: string,
  assigned_to: 'all' | 'specific',
  groupIds?: string[]
) => {
  const assignment = await createAssignment(title, description, due_date, drive_link, createdBy, assigned_to);
  if (assigned_to === 'specific') {
    if (!groupIds || groupIds.length === 0)
      throw new AppError(400, 'group_ids required when assigned_to is specific');
    await linkAssignmentToGroups(assignment.id, groupIds);
  }
  return assignment;
};

export const getAssignments = async (role: string, userId: string) => {
  return role === 'admin'
    ? getAllAssignments()
    : getAssignmentsForStudent(userId);
};

export const editAssignment = async (
  id: string,
  title: string,
  description: string,
  due_date: string,
  drive_link: string | null,
  assigned_to: 'all' | 'specific'
) => {
  const assignment = await getAssignmentById(id);
  if (!assignment) throw new AppError(404, 'Assignment not found');
  return updateAssignment(id, title, description, due_date, drive_link, assigned_to);
};

export const removeAssignment = async (id: string) => {
  const assignment = await getAssignmentById(id);
  if (!assignment) throw new AppError(404, 'Assignment not found');
  await deleteAssignment(id);
  return { message: 'Assignment deleted successfully' };
};