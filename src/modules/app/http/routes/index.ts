import { Router } from 'express';
import { musicRoutes } from './music.routes';
import { videoRoutes } from './video.routes';
import { imageRoutes } from './image.routes';

const router = Router();

router.use('/music', musicRoutes);
router.use('/video', videoRoutes);
router.use('/image', imageRoutes);

export default router;
