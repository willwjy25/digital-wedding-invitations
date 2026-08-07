import { Router } from 'express';
import { get } from './public-invitation.controller';

const router = Router();

router.get('/:tenantSlug', get);

export default router;
