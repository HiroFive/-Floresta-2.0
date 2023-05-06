import {
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Store } from '@ngrx/store';
import { MapMarkerSelectors } from '../../store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { IMapMarker } from '../../common/interfaces';
import { BaseMarker, Marker } from '../../common/classes';
import { AddMapMarkerFormComponent } from '../forms';
import { ModalService } from '../../services';
import { MapTypeEnum } from '../../common/enums/map';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  @Input() options: google.maps.MapOptions;
  @Input() markerInfoWindowTemplate: any;
  @Input() mapType: MapTypeEnum = MapTypeEnum.User;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  mapTypeEnum = MapTypeEnum;
  center: google.maps.LatLngLiteral;
  markers: any[] = [];
  selectedMarker = { $implicit: {} };

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit() {
    this.store
      .select(MapMarkerSelectors.getMapMarkers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((mapMarkers) => {
        this.markers = mapMarkers?.map((mapMarker: IMapMarker) => ({
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
        }));
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
    this.selectedMarker.$implicit = selectedMarker;
    this.info.open(marker);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
