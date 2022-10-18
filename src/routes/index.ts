import { Router } from 'express';
import userRouter from './api/userRouter';

const router = Router();

router.use('/users', userRouter);

export default router;