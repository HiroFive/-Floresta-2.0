import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MapMarketService } from '../../services';
import { MapMarkerActions } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class MapMarkersEffects {
  constructor(
    private actions$: Actions,
    private mapMarketService: MapMarketService,
  ) {}

  getMapMarkersByRoleIdId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapMarkerActions.getMapMarkerByRoleId),
      mergeMap((action) =>
        this.mapMarketService.getMapMarkerByRoleId(action.roleId).pipe(
          map((mapMarkers) =>
            MapMarkerActions.getMapMarkerByRoleIdSuccess({ mapMarkers }),
          ),
          catchError(() => of(MapMarkerActions.getMapMarkerByRoleIdFailed())),
        ),
      ),
    ),
  );

  createMapMarker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapMarkerActions.createMapMarker),
      mergeMap(({ mapMarker }) =>
        this.mapMarketService.createMapMarker(mapMarker).pipe(
          map((mapMarker) =>
            MapMarkerActions.createMapMarkerSuccess({ mapMarker }),
          ),
          catchError(() => of(MapMarkerActions.createMapMarkerFailed())),
        ),
      ),
    ),
  );
}
