import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  res.json({
    summary: 'Converter File',
    version: '1.0.0',
    status: 'Running on Development',
    origin: 'RICARDO - Development',
  });
});

export default routes;
