import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  LocalStorageService,
  MapMarketService,
  ModalService,
} from '../../services';
import { MapMarkerActions } from '../actions';
import { of } from 'rxjs';
import { USER_PROFILE } from '../../common/local-storage-keys';
import { Store } from '@ngrx/store';

@Injectable()
export class MapMarkersEffects {
  constructor(
    private readonly store: Store<any>,
    private readonly actions$: Actions,
    private readonly mapMarketService: MapMarketService,
    private readonly modalService: ModalService,
    private readonly localStorageService: LocalStorageService,
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
          tap(() => {
            const role = JSON.parse(
              this.localStorageService.getItem(USER_PROFILE) || {},
            )?.role;

            this.store.dispatch(
              MapMarkerActions.getMapMarkerByRoleId({ roleId: role }),
            );
          }),
          catchError(() => of(MapMarkerActions.createMapMarkerFailed())),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapMarkerActions.updateMarker),
      mergeMap((action) =>
        this.mapMarketService
          .updateMapMarker(action?.id, action?.mapMarker)
          .pipe(
            map((marker) => {
              this.modalService.changeOpenState(false);
              return MapMarkerActions.updateMarkerSuccess({
                mapMarker: marker,
              });
            }),
            tap(() => {
              const role = JSON.parse(
                this.localStorageService.getItem(USER_PROFILE) || {},
              )?.role;

              this.store.dispatch(
                MapMarkerActions.getMapMarkerByRoleId({ roleId: role }),
              );
            }),
            catchError(() => of(MapMarkerActions.updateMarkerFailed())),
          ),
      ),
    ),
  );

  updateMapMarkerVisibility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapMarkerActions.updateMapMarkerVisibility),
      mergeMap(({ id, isHidden }) =>
        this.mapMarketService.updateMapMarkerVisibility(id, isHidden).pipe(
          map(() =>
            MapMarkerActions.updateMapMarkerVisibilitySuccess({ id, isHidden }),
          ),
          catchError(() =>
            of(MapMarkerActions.updateMapMarkerVisibilityFailed()),
          ),
        ),
      ),
    ),
  );

  deleteMapMarker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapMarkerActions.deleteMapMarker),
      mergeMap(({ id }) =>
        this.mapMarketService.deleteMapMarkerById(id).pipe(
          map(() => MapMarkerActions.deleteMapMarkerSuccess({ id })),
          catchError(() => of(MapMarkerActions.deleteMapMarkerFailed())),
        ),
      ),
    ),
  );
}
