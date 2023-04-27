import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { MapMarkerActions } from '../../store/actions';
import { MapMarkerSelectors, ProfileSelectors } from '../../store/selectors';
import { filter, Subject, takeUntil } from 'rxjs';
import { IMapMarker } from '../../common/interfaces';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    mapTypeId: 'hybrid',
  };
  markers: any[] = [];
  infoContent = '';

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
            position: {
              lat: mapMarker.lat,
              lng: mapMarker.lng,
            },
            label: {
              color: 'red',
              text: 'Marker label ' + mapMarker.lat,
            },
            title: 'Marker title ' + mapMarker.lat,
            info: 'Marker info ' + mapMarker.lat,
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

  click(event: google.maps.MapMouseEvent) {
    console.log(event?.latLng?.lat());
    this.addMarker(event?.latLng?.lat() || 0, event?.latLng?.lng() || 0);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker(lat: number, lng: number) {
    this.store.dispatch(
      MapMarkerActions.createMapMarker({
        mapMarker: {
          hidden: false,
          lat,
          lng,
          productIds: [1],
        },
      }),
    );

    this.markers.push({
      position: {
        lat,
        lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    });
  }

  openInfo(marker: any, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
