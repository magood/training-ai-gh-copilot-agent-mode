import { Router } from 'express';

import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ title: 1 }).lean();
  res.json(workouts);
});

export default router;
