import { Router } from 'express';
import { create, summary } from './rsvp.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', create); // publik, tanpa auth — untuk submit dari tamu
router.get('/summary', authMiddleware, summary); // khusus admin

export default router;
