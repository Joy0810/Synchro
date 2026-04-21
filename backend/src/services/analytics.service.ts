import { GroupModel } from '../models/group.model';
import { AssignmentModel } from '../models/assignment.model';
import { SubmissionModel } from '../models/submission.model';
import { CourseModel } from '../models/course.model';

export const fetchOverview = async () => {
  const [total_groups, total_assignments, total_courses, submitted_count] = await Promise.all([
    GroupModel.countDocuments(),
    AssignmentModel.countDocuments(),
    CourseModel.countDocuments(),
    SubmissionModel.countDocuments({ submissionStatus: 'confirmed' }),
  ]);

  const pending_count = total_assignments - submitted_count;

  return {
    total_groups,
    total_assignments,
    total_courses,
    submitted_count,
    pending_count,
  };
};