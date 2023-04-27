import { Router } from 'express';
import { initUserApi } from './user.api';
import { initRoleApi } from './role.api';
import { initCartApi } from './cart.api';
import { initMapMarkerApi } from './map-marker.api';

const apis: any[] = [initUserApi, initRoleApi, initCartApi, initMapMarkerApi];

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use('/api/', apiRouter);
  apis.forEach((api: any) => api(apiRouter));

  return apiRouter;
};

export { initApi };
