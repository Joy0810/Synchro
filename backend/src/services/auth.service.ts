import bcrypt from "bcryptjs";
import { findUserByEmail, findUserById, createUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/error.middleware";
import { JWTPayload } from "../types";

const SALT_ROUNDS=10;

export const register=async(
    name:string,
    email:string,
    password:string,
    role:"student"|"admin"
)=>{
    const existing=await findUserByEmail(email);
    if(existing){
        throw new AppError(400,"User already exists");
    }

    const hashedPassword=await bcrypt.hash(password,SALT_ROUNDS);
    const user=await createUser(name,email,hashedPassword,role);
    return user;
}

export const login=async(
    email:string,
    password:string
)=>{
    const user=await findUserByEmail(email);
    if(!user){
        throw new AppError(401,"Invalid email or password");
    }

    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw new AppError(401,"Invalid email or password");
    }

    const payload:JWTPayload={
        userId:user.id,
        email:user.email,
        role:user.role,
    }
    const token=jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {expiresIn:"5h"}
    );
    return{
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    };
};

export const getMe=async(userId:string)=>{
    const user=await findUserById(userId);
    if(!user){
        throw new AppError(404,"User not found");
    }
    return user;
}