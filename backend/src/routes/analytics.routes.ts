import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth.middleware';
import { fetchOverview } from '../services/analytics.service';

const router = Router();

router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/overview', async (req, res, next) => {
  try {
    const data = await fetchOverview();
    res.json({ success: true, data });
  } catch (e) { next(e); }
});

export default router;