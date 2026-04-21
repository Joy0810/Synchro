import {Router} from 'express';
import {z} from 'zod';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import {
    createCourse, getMyCourses, 
    enrollInCourse, getCourseById, 
    removeCourse
} from '../services/course.service';
import { AuthRequest } from '../types';

const router=Router();

const createCourseSchema=z.object({
    title:z.string().min(1),
    description:z.string().min(1),
});

const enrollSchema=z.object({
    courseCode:z.string().min(1)
});

router.use(verifyToken);

router.get("/",async(req:AuthRequest,res,next)=>{
    try{
        const courses=await getMyCourses(req.user!.userId,req.user!.role);
        res.json({ success:true, data:courses });
    }catch(e){
        next(e);
    }
})

router.post("/",requireRole("admin"),async(req:AuthRequest,res,next)=>{
    try{
        const {title,description}=createCourseSchema.parse(req.body);
        const course=await createCourse(title,description,req.user!.userId);
        res.status(201).json({ success:true, data:course });
    }catch(e){
        next(e);
    }
});

router.post("/enroll",requireRole("student"),async(req:AuthRequest,res,next)=>{
    try{
        const { courseCode }=enrollSchema.parse(req.body);
        const result=await enrollInCourse(courseCode,req.user!.userId);
        res.json({ success:true, data:result });
    }
    catch(e){
        next(e);
    }
});

router.get("/:id",async(req:AuthRequest,res,next)=>{
    try{
        const course=await getCourseById(req.params.id);
        res.json({ success:true, data:course });
    }catch(e){
        next(e);
    }
})

router.delete("/:id",requireRole("admin"),async(req:AuthRequest,res,next)=>{
    try{
        const result=await removeCourse(req.params.id,req.user!.userId);
        res.json({ success:true, data:result });
    }catch(e){
        next(e);
    }
})

export default router;