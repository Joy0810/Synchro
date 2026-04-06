import pool from "../config/db";
import { Group, User } from "../types";

export const createGroup=async(
    name:string,
    ownerId:string
):Promise<Group>=>{
    const client=await pool.connect();
    try{
        await client.query("BEGIN");
        const {rows}=await client.query<Group>(
            `INSERT INTO groups(name,owner_id)
            VALUES($1,$2)
            RETURNING *`,
            [name,ownerId]
        );
        await client.query(
            `INSERT INTO group_members(group_id,user_id) VALUES($1,$2)`,
            [rows[0].id,ownerId]
        );
        await client.query("COMMIT");
        return rows[0];
    }catch(e){
        await client.query("ROLLBACK");
        throw e;
    }finally{
        client.release();
    }
};

export const getGroupByUserId=async(
    userId:string
):Promise<Group[]>=>{
    const {rows}=await pool.query<Group>(
        `SELECT g.* FROM groups g
        INNER JOIN group_members gm ON g.id = gm.group_id
        WHERE gm.user_id = $1
        ORDER BY g.created_at DESC`,
        [userId]
    );
    return rows;
}

export const getGroupById=async(
    id:string
):Promise<Group|null>=>{
    const { rows } = await pool.query<Group>(
        'SELECT * FROM groups WHERE id = $1',
        [id]
    );
    return rows[0] ?? null;
}

export const getGroupMembers=async(
    groupId:string
):Promise<User[]>=>{
    const { rows } = await pool.query(
        `SELECT u.id, u.name, u.email, gm.joined_at
        FROM users u
        INNER JOIN group_members gm ON u.id = gm.user_id
        WHERE gm.group_id = $1`,
        [groupId]
    );
    return rows;
}

export const addMemberToGroup=async(
    groupId:string,
    userId:string
):Promise<void>=>{
    await pool.query(
        `INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [groupId, userId]
    );
}

export const removeMemberFromGroup=async(
    groupId:string,
    userId:string
):Promise<void>=>{
    await pool.query(
        `DELETE FROM group_members WHERE group_id = $1 AND user_id = $2`,
        [groupId, userId]
    );
}

export const getAllGroups=async():Promise<Group[]>=>{
    const { rows } = await pool.query<Group>(
        'SELECT * FROM groups ORDER BY created_at DESC'
    );
    return rows;
}

export const deleteGroup=async(
    id:string
):Promise<void>=>{
    await pool.query('DELETE FROM groups WHERE id = $1', [id]);
}

export const updateGroupOwner = async (groupId: string, newOwnerId: string): Promise<void> => {
  await pool.query(
    `UPDATE groups SET owner_id = $1 WHERE id = $2`,
    [newOwnerId, groupId]
  );
};