import { IMapMarker, IMapMarkerWithProductInfo } from '~/common/interfaces';
import { mapMarkerRepository } from '~/data/repositories';

export class MapMarkerService {
  public getAllMarkersByRole(roleId: number): Promise<Array<IMapMarker>> {
    return mapMarkerRepository.getAllMarkers(roleId);
  }

  public getByIdWithProductsInfo(
    id: number,
  ): Promise<IMapMarkerWithProductInfo> {
    return new Promise(async (resolve, reject) => {
      try {
        const mapMarkers = await mapMarkerRepository.getMapMarketWithProducts(
          id,
        );

        resolve({
          ...mapMarkers?.[0],
          products: mapMarkers.map(({ products }) => products),
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public createMapMarker(mapMarker: IMapMarker): Promise<IMapMarker> {
    return mapMarkerRepository.createMapMarker(mapMarker);
  }

  public async updateMapMarker(
    id: number,
    data: IMapMarker,
  ): Promise<IMapMarker[]> {
    return mapMarkerRepository.updateById(id, data);
  }

  public deleteMapMarker(id: number): Promise<number> {
    return mapMarkerRepository.deleteById(id);
  }
}
