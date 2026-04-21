export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  courseCode: string;
  createdBy: { _id: string; name: string; email: string };
  enrolledStudents: { _id: string; name: string; email: string }[];
  createdAt: string;
}

export interface Group {
  _id: string;
  id?: string;
  name: string;
  owner: { _id: string; name: string; email: string };
  created_at: string;
  members?: User[];
  member_count?: number;
  assignment_count?: number;
}

export interface Assignment {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  dueDate: string;
  driveLink?: string;
  created_by?: string;
  assignedTo: 'all' | 'specific';
  groupIds?: string[];
  created_at: string;
}

export interface Submission {
  _id: string;
  id?: string;
  assignmentId: string;
  groupId: string;
  confirmed_by?: string;
  confirmedAt?: string;
  submissionLink?: string;
  submissionStatus: "pending" | "confirmed" | "overdue";
  assignment?: Assignment;
  group?: Group;
  confirmed_by_user?: User;
}

export interface AnalyticsOverview {
  total_groups: number;
  total_assignments: number;
  submitted_count: number;
  pending_count: number;
}

export interface GroupAnalytics {
  id: string;
  name: string;
  submitted_count: number;
  total_assignments: number;
  pending_count: number;
}
