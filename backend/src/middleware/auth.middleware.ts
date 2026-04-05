import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, JWTPayload } from "../types";

export const verifyToken=(
    req:AuthRequest,
    res:Response,
    next:NextFunction
):void=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401).json({ success:false, message:"Unauthorized: No token provided" });
        return;
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as JWTPayload;
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({ success:false, message:"Unauthorized: Invalid token" });
    }
};

export const requireRole=(
        ...roles:Array<"student"|"admin">
    )=>{
        return(req:AuthRequest,res:Response,next:NextFunction):void=>{
            if(!req.user||!roles.includes(req.user.role)){
                res.status(403).json({ success:false, message:"Access denied" });
                return;
            }
            next();
        }
    }