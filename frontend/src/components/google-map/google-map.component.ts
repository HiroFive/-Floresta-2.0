import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { MapMarkerActions } from '../../store/actions';
import { MapMarkerSelectors, ProfileSelectors } from '../../store/selectors';
import { filter, Subject, takeUntil } from 'rxjs';
import { IMapMarker } from '../../common/interfaces';
import { BaseMarker, Marker } from '../../common/classes';
import { ModalService } from '../../services';
import { AddMapMarkerComponent } from '../forms';
import { DeleteMapMarkerComponent } from '../forms/delete';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
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
      AddMapMarkerComponent,
      injector,
      'Додати нову мітку',
    );
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
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
}
