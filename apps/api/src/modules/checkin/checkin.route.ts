import { Router } from 'express';
import { verify } from './checkin.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/verify', authMiddleware, verify);

export default router;
