import {Router} from "express";
import { z } from "zod";
import { verifyToken, requireRole } from "../middleware/auth.middleware";
import {
    createNewAssignment, getAssignments,
    editAssignment, removeAssignment
} from "../services/assignment.service";
import { AuthRequest } from "../types";

const router=Router();

const createAssignmentSchema=z.object({
    title:z.string().min(1),
    description:z.string().optional(),
    due_date:z.string().datetime(),
    drive_link:z.string().url().nullable().optional(),
    assigned_to:z.enum(["all","specific"]),
    group_ids:z.array(z.string().uuid()).optional()
});

const updateAssignmentSchema=z.object({ 
    title:z.string().min(1),    
    description:z.string().optional(),
    due_date:z.string().datetime(),
    drive_link:z.string().url().nullable().optional(),
    assigned_to:z.enum(["all","specific"])
});

router.use(verifyToken);

router.get("/",async(req:AuthRequest,res,next)=>{
    try{
        const assignments=await getAssignments(req.user!.role,req.user!.userId);
        res.json({ success:true, data:assignments });
    }catch(e){
        next(e);
    }
});

router.post('/',requireRole("admin"),async(req:AuthRequest,res,next)=>{
    try{
        const body = createAssignmentSchema.parse(req.body);
        const assignment = await createNewAssignment(
        body.title,
        body.description ?? '',
        body.due_date,
        body.drive_link ?? null,
        req.user!.userId,
        body.assigned_to,
        body.group_ids
        );
        res.status(201).json({ success: true, data: assignment });
    }catch(e){
        next(e);
    }
});

router.put("/:id",requireRole("admin"),async(req:AuthRequest,res,next)=>{
    try{
        const body=updateAssignmentSchema.parse(req.body);
        const assignment=await editAssignment(
            req.params.id,
            body.title,
            body.description ?? '',
            body.due_date,
            body.drive_link ?? null,
            body.assigned_to
        );
        res.json({ success:true, data:assignment });
    }catch(e){
        next(e);
    }
});

router.delete('/:id', requireRole('admin'), async (req: AuthRequest, res, next) => {
  try {
    const result = await removeAssignment(req.params.id);
    res.json({ success: true, data: result });
  } catch (e) { next(e); }
});

export default router;