import { Router } from 'express';

import baseRoute from './base.routes';
import { musicRoutes } from '@modules/music/http/routes/music.routes';

const routes = Router();

routes.use(baseRoute);
routes.use(musicRoutes);

export default routes;
