import { z } from "zod";
import { Router } from "express";
import { 
    createNewGroup, getMyGroups, 
    addMember, removeMember, 
    removeGroup, fetchAllGroups,
    transferOwnership
} from "../services/group.service";
import { AuthRequest } from "../types";
import { verifyToken, requireRole } from "../middleware/auth.middleware";

const router=Router();

const createGroupSchema=z.object({
    name:z.string().min(3)
});
const addMemberSchema=z.object({
    email:z.string().email()
});

router.use(verifyToken);

router.get("/",async(req:AuthRequest,res,next)=>{
    try{
        const groups=req.user!.role==="admin"
            ?await fetchAllGroups()
            :await getMyGroups(req.user!.userId);
        res.json({ success:true, data:groups });
    }catch(e){
        next(e);
    }
});

router.post("/",requireRole("student"),async(req:AuthRequest,res,next)=>{
    try{
        const { name }=createGroupSchema.parse(req.body);
        const group=await createNewGroup(name,req.user!.userId);
        res.json({ success:true, data:group });
    }catch(e){
        next(e);
    }
});

router.post("/:id/members",verifyToken,async(req:AuthRequest,res,next)=>{
    try{
        const {email}=addMemberSchema.parse(req.body);
        const result=await addMember(req.params.id,email,req.user!.userId);
        res.json({ success:true, data:result });
    }catch(e){
        next(e);
    }
});

router.delete("/:id/members/:userId",verifyToken,async(req:AuthRequest,res,next)=>{
    try{
        const result=await removeMember(req.params.id,req.params.userId,req.user!.userId);
        res.json({ success:true, data:result });
    }catch(e){
        next(e);
    }
});

router.delete("/:id", async (req: AuthRequest, res, next) => {
  try {
    const result = await removeGroup(req.params.id, req.user!.userId, req.user!.role);
    res.json({ success: true, data: result });
  } catch(e) { next(e); }
});

router.patch("/:id/owner", async (req: AuthRequest, res, next) => {
  try {
    const { newOwnerId } = z.object({ newOwnerId: z.string().uuid() }).parse(req.body);
    const result = await transferOwnership(req.params.id, newOwnerId, req.user!.userId, req.user!.role);
    res.json({ success: true, data: result });
  } catch(e) { next(e); }
});

export default router;