import pool from "../config/db";
import { Assignment } from "../types";

export const createAssignment=async(
    title:string,
    description:string,
    due_date:string,
    drive_link:string|null,
    createdBy:string,
    assignedTo:"all"|"specific"
):Promise<Assignment>=>{
    const {rows}=await pool.query<Assignment>(
        `INSERT INTO assignments(title,description,due_date,drive_link,created_by,assigned_to)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [title,description,due_date,drive_link,createdBy,assignedTo]
    );
    return rows[0];
};

export const linkAssignmentToGroups=async(
    assignmentId:string,
    groupIds:string[]
):Promise<void>=>{
    for(const groupId of groupIds){
        await pool.query(
            `INSERT INTO assignment_groups(assignment_id,group_id)
            VALUES($1,$2)`,
            [assignmentId,groupId]
        );
    }
};

export const getAssignmentById=async(
    id:string
):Promise<Assignment|null>=>{
    const {rows}=await pool.query<Assignment>(
        'SELECT * FROM assignments WHERE id=$1',
        [id]
    );
    return rows[0]??null;
};

export const getAllAssignments=async():Promise<Assignment[]>=>{
    const {rows}=await pool.query<Assignment>(
        'SELECT * FROM assignments order by created_at DESC'
    );
    return rows;
};

export const getAssignmentsForStudent=async(
    userId:string
):Promise<Assignment[]>=>{
    const {rows}=await pool.query<Assignment>(
        `SELECT DISTINCT a.* FROM assignments a
        LEFT JOIN assignment_groups ag ON a.id = ag.assignment_id
        LEFT JOIN group_members gm ON ag.group_id = gm.group_id
        WHERE a.assigned_to = 'all'
        OR gm.user_id = $1
        ORDER BY a.created_at DESC`,
        [userId]
    );
    return rows;
};

export const updateAssignment = async (
  id: string,
  title: string,
  description: string,
  due_date: string,
  drive_link: string | null,
  assigned_to: 'all' | 'specific'
): Promise<Assignment | null> => {
  const { rows } = await pool.query<Assignment>(
    `UPDATE assignments
     SET title=$1, description=$2, due_date=$3, drive_link=$4, assigned_to=$5
     WHERE id=$6
     RETURNING *`,
    [title, description, due_date, drive_link, assigned_to, id]
  );
  return rows[0] ?? null;
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM assignments WHERE id = $1', [id]);
};