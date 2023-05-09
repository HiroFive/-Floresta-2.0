import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapMarkerActions, ProductActions } from '../../../store/actions';
import { ukraineBounds } from '../../../common/consts/map-ukraine-borders.const';
import { ProfileSelectors } from '../../../store/selectors';
import { filter, Subject, takeUntil } from 'rxjs';
import { BaseMarker, Marker } from '../../../common/classes';
import { EditMapMarkerFormComponent } from '../../../components/forms/map-merker/edit-map-marker-form/edit-map-marker-form.component';
import { DeleteMapMarkerComponent } from '../../../components/delete-dialog';
import { ModalService } from '../../../services';
import { MapTypeEnum } from '../../../common/enums/map';

@Component({
  selector: 'app-map-mark-setting-page',
  templateUrl: './map-mark-setting-page.component.html',
  styleUrls: ['./map-mark-setting-page.component.scss'],
})
export class MapMarkSettingPageComponent implements OnInit, OnDestroy {
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
    disableDoubleClickZoom: true,
  };
  mapTypeEnum = MapTypeEnum;

  private readonly unsubscribe$ = new Subject();

  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.getProfile)
      .pipe(
        filter((profile) => !!profile?.id),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((profile) => {
        this.store.dispatch(
          MapMarkerActions.getMapMarkerByRoleId({ roleId: profile?.role }),
        );
      });

    this.store.dispatch(ProductActions.getAllProduct());
  }

  updateMapMarkerVisibility(selectedMarker: any): void {
    this.store.dispatch(
      MapMarkerActions.updateMapMarkerVisibility({
        id: selectedMarker.id,
        isHidden: !selectedMarker.hidden,
      }),
    );
  }

  editMarker(selectedMarker: any) {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseMarker,
          useValue: new Marker(
            selectedMarker?.position?.lat,
            selectedMarker?.position?.lng,
            selectedMarker.hidden,
            selectedMarker.id,
            selectedMarker.productIds,
          ),
        },
      ],
      parent: this.inj,
    });

    this.modalService.openNewModal(
      EditMapMarkerFormComponent,
      injector,
      'Редагувати нову',
    );
  }
  deleteMapMarker(selectedMarker: any): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseMarker,
          useValue: new Marker(0, 0, false, selectedMarker.id),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(DeleteMapMarkerComponent, injector);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
