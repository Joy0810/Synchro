import pool from "../config/db";
import { User } from "../types";

export const findUserByEmail=async(email:string):Promise<User|null>=>{
    const {rows}=await pool.query<User>(
        'SELECT * from users WHERE email=$1',
        [email]
    );
    return rows[0]||null;
};

export const findUserById=async(id:string):Promise<User|null>=>{
    const {rows}=await pool.query<User>(
        'SELECT * FROM users WHERE id=$1',
        [id]
    );
    return rows[0]||null;
}

export const createUser=async(
    name:string,
    email:string,
    hashedPassword:string,
    role:"student"|"admin"
):Promise<User>=>{
    const {rows}=await pool.query<User>(
        `INSERT INTO users(name,email,password,role)
        VALUES($1,$2,$3,$4)
        RETURNING id,name,email,role,created_at`,
        [name,email,hashedPassword,role]
    );
    return rows[0];
}