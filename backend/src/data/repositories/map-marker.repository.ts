import { mapMarkerModule } from '../models';
import { getMapMarketParams } from '../atributes';
import { IMapMarker } from '~/common/interfaces';

class MapMarkerRepository {
  public getById(id: number): Promise<IMapMarker | null> {
    return mapMarkerModule.findByPk(id, getMapMarketParams());
  }

  public getAllMarkers(roleId: number): Promise<Array<IMapMarker> | null> {
    return mapMarkerModule.findAll(
      getMapMarketParams('getByRoleId', { roleId: roleId }),
    );
  }

  public createMapMarker(newMapMarker: IMapMarker): Promise<IMapMarker> {
    console.log(newMapMarker);
    return mapMarkerModule.create(newMapMarker as any);
  }
}

export { MapMarkerRepository };
