import { Router } from 'express';
import { z } from 'zod';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import { submitAssignment, getGroupSubmissions, getAllSubmissionsAdmin, getUserSubmissions } from '../services/submission.service';
import { AuthRequest } from '../types';

const router = Router();

const submitSchema = z.object({
  assignmentId: z.string(),
  groupId: z.string().optional().nullable(),
  submissionLink: z.string().optional().nullable(),
});

router.use(verifyToken);

router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { assignmentId, groupId, submissionLink } = submitSchema.parse(req.body);
    const submission = await submitAssignment(
      assignmentId,
      groupId,
      req.user!.userId,
      submissionLink ?? ''
    );
    res.status(201).json({ success: true, data: submission });
  } catch (e) { next(e); }
});

router.get('/my', async (req: AuthRequest, res, next) => {
  try {
    const submissions = await getUserSubmissions(req.user!.userId);
    res.json({ success: true, data: submissions });
  } catch (e) { next(e); }
});

router.get('/group/:groupId', async (req: AuthRequest, res, next) => {
  try {
    const submissions = await getGroupSubmissions(req.params.groupId, req.user!.userId);
    res.json({ success: true, data: submissions });
  } catch (e) { next(e); }
});

router.get('/admin', requireRole('admin'), async (req: AuthRequest, res, next) => {
  try {
    const submissions = await getAllSubmissionsAdmin();
    res.json({ success: true, data: submissions });
  } catch (e) { next(e); }
});

export default router;