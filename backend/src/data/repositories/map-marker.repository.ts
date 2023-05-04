import { mapMarkerModule } from '../models';
import { getMapMarketParams } from '../atributes';
import { IMapMarker } from '~/common/interfaces';

export class MapMarkerRepository {
  public getById(id: number): Promise<IMapMarker | null> {
    return mapMarkerModule.findByPk(id, getMapMarketParams());
  }

  public getAllMarkers(roleId: number): Promise<Array<IMapMarker> | null> {
    return mapMarkerModule.findAll(
      getMapMarketParams('getByRoleId', { roleId: roleId }),
    );
  }

  public createMapMarker(newMapMarker: IMapMarker): Promise<IMapMarker> {
    return mapMarkerModule.create(newMapMarker as any);
  }

  public async updateById(id: number, data: IMapMarker): Promise<IMapMarker[]> {
    const result = await mapMarkerModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: number): Promise<number> {
    return mapMarkerModule.destroy({
      where: { id },
    });
  }
}
