import http from 'http';

import app from './app';
import logger from 'Config/logger';

const server = http.createServer(app);

const PORT = process.env.PORT || 3331;

server.listen(PORT, () => {
  logger.info(`SERVER IS RUNNING ON PORT [${PORT}]`);
});
