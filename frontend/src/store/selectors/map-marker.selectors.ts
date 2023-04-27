import { createSelector } from '@ngrx/store';

export const selectMapMarkers = (state: any) => state.mapMarkers;

export const getMapMarkers = createSelector(
  selectMapMarkers,
  (state: any) => state?.mapMarkers,
);
