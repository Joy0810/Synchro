import { Router } from 'express';
import { z } from 'zod';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import { submitAssignment, getGroupSubmissions, getAllSubmissionsAdmin } from '../services/submission.service';
import { AuthRequest } from '../types';

const router = Router();

const submitSchema = z.object({
  assignment_id: z.string().uuid(),
  group_id: z.string().uuid(),
  submission_link: z.string().url(),
});

router.use(verifyToken);

router.post('/', requireRole('student'), async (req: AuthRequest, res, next) => {
  try {
    const { assignment_id, group_id, submission_link } = submitSchema.parse(req.body);
    const submission = await submitAssignment(assignment_id, group_id, req.user!.userId, submission_link);
    res.status(201).json({ success: true, data: submission });
  } catch (e) { next(e); }
});

router.get('/group/:group_id', requireRole('student'), async (req: AuthRequest, res, next) => {
  try {
    const submissions = await getGroupSubmissions(req.params.group_id, req.user!.userId);
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