export interface User {
  id: string;
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

export interface Group {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  members?: User[];
  member_count?: number;
  assignment_count?: number;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  drive_link?: string;
  created_by?: string;
  assigned_to: 'all' | 'specific';
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  group_id: string;
  confirmed_by?: string;
  confirmed_at?: string;
  submission_link?: string;
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
