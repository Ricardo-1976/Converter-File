import { Router } from 'express';

import baseRoute from './base.routes';

const routes = Router();

routes.use(baseRoute);

export default routes;
