import { Component, OnDestroy, OnInit } from '@angular/core';
import { ukraineBounds } from '../../common/consts/map-ukraine-borders.const';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MapMarkerActions } from '../../store/actions';
import { RouterPathEnum, UserRolesEnum } from '../../common/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-component-page.component.html',
  styleUrls: ['./home-component-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  mapsOptions: google.maps.MapOptions = {
    center: ukraineBounds.getCenter(),
    zoom: 7,
    restriction: {
      latLngBounds: ukraineBounds,
      strictBounds: true,
    },
    zoomControl: true,
    scrollwheel: true,
    mapTypeId: 'hybrid',
  };

  private readonly unsubscribe$ = new Subject();

  constructor(
    private readonly store: Store<any>,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      MapMarkerActions.getMapMarkerByRoleId({ roleId: UserRolesEnum.Customer }),
    );
  }

  catalogRedirection(selectedMarker: any): void {
    this.router.navigate([RouterPathEnum.Catalog], {
      queryParams: { id: selectedMarker?.id },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
