import authRoutes from './auth';
import components from './components';
import infos from './infos';
import servers from './servers';
import tags from './tags';

export default {
  ...infos,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...authRoutes,
  },
};
