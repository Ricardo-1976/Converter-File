import { Router } from 'express';

import baseRoute from './base.routes';
import { musicRoutes } from '@modules/app/http/routes/music.routes';
import { videoRoutes } from '@modules/app/http/routes/video.routes';
import { imageRoutes } from '@modules/app/http/routes/image.routes';
import { docRoutes } from '@modules/app/http/routes/doc.routes';

const routes = Router();

routes.use(baseRoute);
routes.use(musicRoutes);
routes.use(videoRoutes);
routes.use(imageRoutes);
routes.use(docRoutes);

export default routes;
