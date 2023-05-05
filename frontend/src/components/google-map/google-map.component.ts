import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { MapMarkerActions } from '../../store/actions';
import { MapMarkerSelectors, ProfileSelectors } from '../../store/selectors';
import { filter, Subject, takeUntil } from 'rxjs';
import { IMapMarker } from '../../common/interfaces';
import { BaseMarker, Marker } from '../../common/classes';
import { ModalService } from '../../services';
import { AddMapMarkerFormComponent } from '../forms';
import { DeleteMapMarkerComponent } from '../forms/delete';
import { EditMapMarkerFormComponent } from '../forms/map-merker/edit-map-marker-form/edit-map-marker-form.component';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  ukraineBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(44.103276, 22.137117), // Southwest corner
    new google.maps.LatLng(52.379189, 40.228151), // Northeast corner
  );
  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    center: this.ukraineBounds.getCenter(),
    zoom: 7,
    restriction: {
      latLngBounds: this.ukraineBounds,
      strictBounds: true,
    },
    zoomControl: true,
    scrollwheel: true,
    mapTypeId: 'hybrid',
  };
  markers: any[] = [];
  selectedMarker: any;

  ngOnInit() {
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

    this.store
      .select(MapMarkerSelectors.getMapMarkers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((mapMarkers) => {
        this.markers = mapMarkers?.map((mapMarker: IMapMarker) => {
          return {
            id: mapMarker.id,
            hidden: mapMarker.hidden,
            productIds: mapMarker.productIds,
            position: {
              lat: mapMarker.lat,
              lng: mapMarker.lng,
            },
            label: {
              color: 'white',
              text: 'Мітку #' + mapMarker.id,
            },
            options: {
              animation: google.maps.Animation.DROP,
            },
          };
        });
        console.log(mapMarkers);
      });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 35,
        lng: 33,
      };
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseMarker,
          useValue: new Marker(
            event?.latLng?.lat() || 0,
            event?.latLng?.lng() || 0,
            false,
          ),
        },
      ],
      parent: this.inj,
    });

    this.modalService.openNewModal(
      AddMapMarkerFormComponent,
      injector,
      'Додати нову мітку',
    );
  }

  openInfo(marker: any, selectedMarker: any) {
    this.selectedMarker = selectedMarker;
    this.info.open(marker);
  }

  updateMapMarkerVisibility(): void {
    this.store.dispatch(
      MapMarkerActions.updateMapMarkerVisibility({
        id: this.selectedMarker.id,
        isHidden: !this.selectedMarker.hidden,
      }),
    );
    this.info.close();
  }

  editMarker() {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseMarker,
          useValue: new Marker(
            this.selectedMarker?.position?.lat,
            this.selectedMarker?.position?.lng,
            this.selectedMarker.hidden,
            this.selectedMarker.id,
            this.selectedMarker.productIds,
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
  deleteMapMarker(): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseMarker,
          useValue: new Marker(0, 0, false, this.selectedMarker.id),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(DeleteMapMarkerComponent, injector);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
