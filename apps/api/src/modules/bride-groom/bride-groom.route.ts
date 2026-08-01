import { Router } from 'express';
import { get, upsert } from './bride-groom.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, get);
router.put('/', authMiddleware, upsert);

export default router;
