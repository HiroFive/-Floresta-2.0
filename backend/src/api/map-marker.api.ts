import { Router } from 'express';
import {
  HttpCode,
  mapMarkerApiPathEnum,
  rootApiPathEnum,
  UserRolesEnum,
} from '../common/enums';
import { mapMarkerService } from '../services';
import { checkIsFound } from '~/utils';

export const initMapMarkerApi = (apiRouter: Router): Router => {
  const mapMarkerRouter = Router();

  apiRouter.use(rootApiPathEnum.MapMarker, mapMarkerRouter);

  mapMarkerRouter.get(mapMarkerApiPathEnum.ROOT, async (_req, res) => {
    try {
      const mapMarker = await mapMarkerService.getAllMarkersByRole(
        Number(`${_req.query.roleId || UserRolesEnum.Customer}`),
      );
      res.status(checkIsFound(mapMarker)).json(mapMarker);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
    }
  });

  mapMarkerRouter.get(mapMarkerApiPathEnum.GetProducts, async (_req, res) => {
    try {
      const mapMarker = await mapMarkerService.getByIdWithProductsInfo(
        Number(_req?.query?.id || 0),
      );

      res.status(checkIsFound(mapMarker)).json(mapMarker);
    } catch (error) {
      res.status(HttpCode.NOT_FOUND).json({ message: error?.message });
    }
  });

  mapMarkerRouter.post(mapMarkerApiPathEnum.ROOT, async (_req, res) => {
    try {
      const createdMapMarker = await mapMarkerService.createMapMarker(
        _req.body,
      );

      res.status(HttpCode.OK).json(createdMapMarker);
    } catch (err) {
      const error = err?.errors?.[0] || 'error';
      res.status(HttpCode.BAD_REQUEST).json({ message: error?.message });
    }
  });

  mapMarkerRouter.patch(mapMarkerApiPathEnum.$ID, async (_req, res) => {
    try {
      const mapMarker = await mapMarkerService.updateMapMarker(
        Number(_req?.params?.id || 0),
        _req.body,
      );
      res.status(HttpCode.OK).json(mapMarker);
    } catch (err) {
      const error = err.errors[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });

  mapMarkerRouter.delete(mapMarkerApiPathEnum.$ID, async (_req, res) => {
    try {
      await mapMarkerService.deleteMapMarker(Number(_req?.params?.id || 0));
      res.status(HttpCode.NO_CONTENT).json('Success');
    } catch (err) {
      const error = err?.errors?.[0];
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  });

  return mapMarkerRouter;
};
