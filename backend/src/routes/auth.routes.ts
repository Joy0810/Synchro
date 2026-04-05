import { Router } from "express";
import { register, login, getMe  } from "../services/auth.service";
import { verifyToken } from "../middleware/auth.middleware";
import { AppError } from "../middleware/error.middleware";
import { z } from "zod";
import { AuthRequest } from "../types";

const router=Router();

const registerSchema=z.object({
    name:z.string().min(1),
    email:z.string().email(),
    password:z.string().min(6),
    role:z.enum(["student","admin"]),
});

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
});

router.post("/register",async(req,res,next)=>{
    try{
        const body=registerSchema.parse(req.body);
        const user=await register(body.name,body.email,body.password,body.role);
        res.status(201).json({ success:true, data:user });
    }catch(e){
        next(e);
    }
});

router.post("/login",async(req,res,next)=>{
    try{
        const body=loginSchema.parse(req.body);
        const result=await login(body.email,body.password);
        res.json({ success:true, data:result });
    }catch(e){
        next(e);
    }
});

router.get("/me",verifyToken,async(req:AuthRequest,res,next)=>{
    try{
        const userId=await getMe(req.user!.userId);
        res.json({ success:true, data:userId });
    }catch(e){
        next(e);
    }
})

export default router;