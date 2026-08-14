import { Router } from 'express';
import { create } from './wish.controller';

const router = Router();

router.post('/', create);

export default router;
