import { Router } from 'express';
import {
  HttpCode,
  mapMarkerApiPath,
  rootApiPath,
  UserRolesEnum,
} from '../common/enums';
import { mapMarkerService } from '../services';
import { checkIsFound } from '~/utils';

const initMapMarkerApi = (apiRouter: Router): Router => {
  const mapMarkerRouter = Router();

  apiRouter.use(rootApiPath.MapMarker, mapMarkerRouter);

  mapMarkerRouter.get(mapMarkerApiPath.ROOT, async (_req, res) => {
    try {
      const mapMarker = await mapMarkerService.getAllMarkersByRole(
        Number(`${_req.query.roleId || UserRolesEnum.Customer}`),
      );
      res.status(checkIsFound(mapMarker)).json(mapMarker);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error.message });
    }
  });

  mapMarkerRouter.post(mapMarkerApiPath.ROOT, async (_req, res) => {
    try {
      const createdMapMarker = await mapMarkerService.createMapMarker(
        _req.body,
      );

      res.status(HttpCode.OK).json(createdMapMarker);
    } catch (err) {
      console.log(err);
      const error = err?.errors?.[0] || 'error';
      res.status(HttpCode.BAD_REQUEST).json({ message: error.message });
    }
  });

  return mapMarkerRouter;
};
export { initMapMarkerApi };
