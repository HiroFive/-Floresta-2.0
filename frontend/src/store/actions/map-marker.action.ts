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
  '[Map Marker] create Map Marker',
  props<{ mapMarker: IMapMarker }>(),
);
export const createMapMarkerSuccess = createAction(
  '[Map Marker] create Map Marker Success',
  props<{ mapMarker: IMapMarker }>(),
);
export const createMapMarkerFailed = createAction(
  '[Map Marker] create Map Marker Failed',
);

export const deleteMapMarker = createAction(
  '[Map Marker] delete-dialog Map Marker',
  props<{ id: number }>(),
);
export const deleteMapMarkerSuccess = createAction(
  '[Map Marker] delete-dialog Map Marker Success',
  props<{ id: number }>(),
);
export const deleteMapMarkerFailed = createAction(
  '[Map Marker] delete-dialog Map Marker Failed',
);

export const updateMapMarkerVisibility = createAction(
  '[Map Marker] update Map Marker Visibility',
  props<{ id: number; isHidden: boolean }>(),
);
export const updateMapMarkerVisibilitySuccess = createAction(
  '[Map Marker] update Map Marker Visibility Success',
  props<{ id: number; isHidden: boolean }>(),
);
export const updateMapMarkerVisibilityFailed = createAction(
  '[Map Marker] update Map Marker Visibility Failed',
);

export const updateMarker = createAction(
  '[Map Marker] update Map Marker',
  props<{ id: number; mapMarker: IMapMarker }>(),
);
export const updateMarkerSuccess = createAction(
  '[Map Marker] update Map Marker Success',
  props<{ mapMarker: IMapMarker }>(),
);
export const updateMarkerFailed = createAction(
  '[Map Marker] update Map Marker Failed',
);
