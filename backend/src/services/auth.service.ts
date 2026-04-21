import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { AppError } from '../middleware/error.middleware';
import { JWTPayload } from '../types';

const SALT_ROUNDS=10;

export const register=async(
    name:string,
    email:string,
    password:string,
    role:"student"|"admin",
)=>{
    const exsistingUser=await UserModel.findOne({email});
    if(exsistingUser){
        throw new AppError(400,"User with this email already exists");
    }
    const hashedPassword=await bcrypt.hash(password,SALT_ROUNDS);
    const user=await UserModel.create({
        name,
        email,
        password:hashedPassword,
        role,
    });
    return user;
}

export const login=async(
    email:string,
    password:string
)=>{
    const user=await UserModel.findOne({email});
    if(!user){
        throw new AppError(400,"Invalid email or password");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new AppError(400,"Invalid email or password");
    }
    const payload:JWTPayload={
        userId:user.id.toString(),
        email:user.email,
        role:user.role,
    };
    const token=jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"5h"});
    return {
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
    };
};

export const getMe=async(userId:string)=>{
    const user=await UserModel.findById(userId);
    if(!user){
        throw new AppError(404,"User not found");
    }
    return user;
}

