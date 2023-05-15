import { Router } from 'express';
import { musicRoutes } from './music.routes';

const router = Router();

router.use('/music', musicRoutes);

export default router;
