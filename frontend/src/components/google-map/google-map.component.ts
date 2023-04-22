import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

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
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
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
