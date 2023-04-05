import { Router } from 'express';

const apis: any[] = [];

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use('/api/', apiRouter);
  apis.forEach((api: any) => api(apiRouter));

  return apiRouter;
};

export { initApi };
