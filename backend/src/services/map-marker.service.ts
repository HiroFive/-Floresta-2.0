import { IMapMarker } from '~/common/interfaces';
import { mapMarkerRepository } from '~/data/repositories';

class MapMarkerService {
  public getAllMarkersByRole(roleId: number): Promise<Array<IMapMarker>> {
    return mapMarkerRepository.getAllMarkers(roleId);
  }

  public createMapMarker(mapMarker: IMapMarker): Promise<IMapMarker> {
    return mapMarkerRepository.createMapMarker(mapMarker);
  }
}

export { MapMarkerService };
