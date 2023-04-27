import { createReducer, on } from '@ngrx/store';
import { MapMarkerActions } from '../actions';
import { IMapMarker } from '../../common/interfaces';

type mapMarkersState = {
  mapMarkers: Array<IMapMarker>;
};
export const mapMarkersState: mapMarkersState = {
  mapMarkers: [],
};

const mapMarkersActionReducer = createReducer(
  mapMarkersState,
  on(MapMarkerActions.getMapMarkerByRoleIdSuccess, (state, action) => ({
    ...state,
    mapMarkers: action.mapMarkers,
  })),
);

export const mapMarkerReducer = { mapMarkers: mapMarkersActionReducer };
