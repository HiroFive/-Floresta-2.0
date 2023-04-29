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
  on(MapMarkerActions.deleteMapMarkerSuccess, (state, action) => {
    const mapMarkers = [...state.mapMarkers];
    const indexToDelete = mapMarkers.findIndex(
      (element) => element.id === action.id,
    );

    if (indexToDelete !== -1) {
      mapMarkers.splice(indexToDelete, 1);
    }

    return { ...state, mapMarkers };
  }),
  on(MapMarkerActions.updateMapMarkerVisibilitySuccess, (state, action) => {
    let mapMarkers = [...state.mapMarkers];

    return {
      ...state,
      mapMarkers: mapMarkers.map((element) =>
        element.id !== action.id
          ? element
          : {
              ...element,
              hidden: action.isHidden,
            },
      ),
    };
  }),
);

export const mapMarkerReducer = { mapMarkers: mapMarkersActionReducer };
