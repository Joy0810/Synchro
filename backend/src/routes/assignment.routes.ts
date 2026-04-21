import { Router } from "express";
import { z } from "zod";
import { verifyToken, requireRole } from "../middleware/auth.middleware";
import {
  createAssignment, getMyAssignmets,
  editAssignment, removeAssignment,
  getAssignmentByCourse
} from "../services/assignment.service";
import { AuthRequest } from "../types";

const router = Router();

const createAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string(),
  driveLink: z.string().optional().nullable(),
  assignedTo: z.enum(["all", "specific"]),
  courseId: z.string().optional().nullable(),
  groupIds: z.array(z.string()).optional(),
});

const updateAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string(),
  driveLink: z.string().optional().nullable(),
  assignedTo: z.enum(["all", "specific"]),
  courseId: z.string().optional().nullable(),
  groupIds: z.array(z.string()).optional(),
});

router.use(verifyToken);

router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const assignments = await getMyAssignmets(req.user!.role, req.user!.userId);
    res.json({ success: true, data: assignments });
  } catch (e) { next(e); }
});

router.get("/course/:courseId", async (req: AuthRequest, res, next) => {
  try {
    const assignments = await getAssignmentByCourse(
      req.params.courseId,
      req.user!.userId,
      req.user!.role
    );
    res.json({ success: true, data: assignments });
  } catch (e) { next(e); }
});

router.post("/", requireRole("admin"), async (req: AuthRequest, res, next) => {
  try {
    const body = createAssignmentSchema.parse(req.body);
    const assignment = await createAssignment(
      body.title,
      body.description ?? '',
      body.dueDate,
      body.driveLink ?? null,
      req.user!.userId,
      body.assignedTo,
      body.courseId ?? undefined,
      body.groupIds
    );
    res.status(201).json({ success: true, data: assignment });
  } catch (e) { next(e); }
});

router.put("/:id", requireRole("admin"), async (req: AuthRequest, res, next) => {
  try {
    const body = updateAssignmentSchema.parse(req.body);
    const assignment = await editAssignment(
      req.params.id,
      body.title,
      body.description ?? '',
      body.dueDate,
      body.driveLink ?? null,
      body.assignedTo,
      body.groupIds,
      body.courseId ?? null,
    );
    res.json({ success: true, data: assignment });
  } catch (e) { next(e); }
});

router.delete("/:id", requireRole("admin"), async (req: AuthRequest, res, next) => {
  try {
    const result = await removeAssignment(req.params.id);
    res.json({ success: true, data: result });
  } catch (e) { next(e); }
});

export default router;