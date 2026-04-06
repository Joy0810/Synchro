import pool from '../config/db';
import { Submission } from '../types';

export const createSubmission = async (
  assignment_id: string,
  group_id: string,
  confirmed_by: string,
  submission_link: string
): Promise<Submission> => {
  const { rows } = await pool.query<Submission>(
    `INSERT INTO submissions(assignment_id, group_id, confirmed_by, confirmed_at, submission_link)
     VALUES($1, $2, $3, NOW(), $4)
     RETURNING *`,
    [assignment_id, group_id, confirmed_by, submission_link]
  );
  return rows[0];
};

export const getSubmissionByAssignmentAndGroup = async (
  assignment_id: string,
  group_id: string
): Promise<Submission | null> => {
  const { rows } = await pool.query<Submission>(
    `SELECT * FROM submissions WHERE assignment_id=$1 AND group_id=$2`,
    [assignment_id, group_id]
  );
  return rows[0] ?? null;
};

export const getSubmissionsByGroup = async (
  group_id: string
): Promise<Submission[]> => {
  const { rows } = await pool.query<Submission>(
    `SELECT s.*, a.title as assignment_title, a.due_date
     FROM submissions s
     JOIN assignments a ON s.assignment_id = a.id
     WHERE s.group_id = $1
     ORDER BY s.confirmed_at DESC`,
    [group_id]
  );
  return rows;
};

export const getAllSubmissions = async (): Promise<Submission[]> => {
  const { rows } = await pool.query<Submission>(
    `SELECT s.*, a.title as assignment_title, g.name as group_name, u.name as confirmed_by_name
     FROM submissions s
     JOIN assignments a ON s.assignment_id = a.id
     JOIN groups g ON s.group_id = g.id
     LEFT JOIN users u ON s.confirmed_by = u.id
     ORDER BY s.confirmed_at DESC`
  );
  return rows;
};

export const isAssignmentVisibleToGroup = async (
  assignment_id: string,
  group_id: string
): Promise<boolean> => {
  const { rows } = await pool.query(
    `SELECT 1 FROM assignment_groups WHERE assignment_id=$1 AND group_id=$2`,
    [assignment_id, group_id]
  );
  return rows.length > 0;
};