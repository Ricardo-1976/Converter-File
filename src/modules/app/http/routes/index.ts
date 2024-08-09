import { Router } from 'express';
import { musicRoutes } from './music.routes';
import { videoRoutes } from './video.routes';
import { imageRoutes } from './image.routes';
import { docRoutes } from './doc.routes';

const router = Router();

router.use('/music', musicRoutes);
router.use('/video', videoRoutes);
router.use('/image', imageRoutes);
router.use('/doc', docRoutes);

export default router;
