import { CourseModel } from '../models/course.model';
import { UserModel } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';

const generateCourseCode = (title: string): string => {
  const prefix = title.replace(/\s+/g, '').slice(0, 6).toUpperCase();
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
};

export const createCourse = async (
  title: string,
  description: string,
  createdBy: string
) => {
  const courseCode = generateCourseCode(title);
  const course = await CourseModel.create({
    title,
    description,
    courseCode,
    createdBy,
    enrolledStudents: [],
  });
  return course;
};

export const getMyCourses = async (userId: string, role: string) => {
  if (role === 'admin') {
    return CourseModel.find({ createdBy: userId })
      .populate('createdBy', 'name email')
      .populate('enrolledStudents', 'name email');
  }
  return CourseModel.find({ enrolledStudents: userId })
    .populate('createdBy', 'name email')
    .populate('enrolledStudents', 'name email');
};

export const enrollInCourse = async (courseCode: string, userId: string) => {
  const course = await CourseModel.findOne({ courseCode });
  if (!course) throw new AppError(404, 'Course not found — check the course code');

  const alreadyEnrolled = course.enrolledStudents.map(s => s.toString()).includes(userId);
  if (alreadyEnrolled) throw new AppError(400, 'You are already enrolled in this course');

  course.enrolledStudents.push(userId as any);
  await course.save();

  // also update user's enrolledCourses
  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: { enrolledCourses: course._id },
  });

  return { message: 'Enrolled successfully', course };
};

export const getCourseById = async (courseId: string) => {
  const course = await CourseModel.findById(courseId)
    .populate('createdBy', 'name email')
    .populate('enrolledStudents', 'name email');
  if (!course) throw new AppError(404, 'Course not found');
  return course;
};

export const removeCourse = async (courseId: string, requesterId: string) => {
  const course = await CourseModel.findById(courseId);
  if (!course) throw new AppError(404, 'Course not found');
  if (course.createdBy.toString() !== requesterId)
    throw new AppError(403, 'Only the course creator can delete this course');
  await CourseModel.findByIdAndDelete(courseId);
  return { message: 'Course deleted successfully' };
};