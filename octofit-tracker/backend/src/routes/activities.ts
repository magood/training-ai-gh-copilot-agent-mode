import { Router } from 'express';

import { ActivityModel } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await ActivityModel.find().sort({ completedAt: -1 }).lean();
  res.json(activities);
});

export default router;
