import { Router } from 'express';

import { UserModel } from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await UserModel.find().sort({ displayName: 1 }).lean();
  res.json(users);
});

export default router;
