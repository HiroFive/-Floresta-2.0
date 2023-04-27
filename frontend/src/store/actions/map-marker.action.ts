import { createAction, props } from '@ngrx/store';
import { IMapMarker } from '../../common/interfaces';

export const getMapMarkerByRoleId = createAction(
  '[Map Marker] get Map Markers by role id',
  props<{ roleId: number }>(),
);
export const getMapMarkerByRoleIdSuccess = createAction(
  '[Map Marker] get Map Markers by role id Success',
  props<{ mapMarkers: Array<IMapMarker> }>(),
);
export const getMapMarkerByRoleIdFailed = createAction(
  '[Map Marker] get Map Markers by role id Failed',
);

export const createMapMarker = createAction(
  '[Map Marker]create Map Marker',
  props<{ mapMarker: IMapMarker }>(),
);
export const createMapMarkerSuccess = createAction(
  '[Map Marker] create Map Marker Success',
  props<{ mapMarker: IMapMarker }>(),
);
export const createMapMarkerFailed = createAction(
  '[Map Marker] create Map Marker Failed',
);
