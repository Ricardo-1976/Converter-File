import 'reflect-metadata';
import 'express-async-errors';
import '@config/environments';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '@docs/index'

import { AppError } from './errors/AppError';
import routes from './routes';
import { versions } from '@utils/versions';
import { AppDataSource } from '@config/db/postgres';

const app = express();
//AppDataSource.initialize();

import '@shared/container'

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(
  `${versions.current}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

app.use(versions.current, routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export default app;
