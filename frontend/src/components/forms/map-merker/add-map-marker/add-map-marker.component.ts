import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapMarkerActions } from '../../../../store/actions';
import { BaseMarker } from '../../../../common/classes';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-info',
  templateUrl: './add-map-marker.component.html',
  styleUrls: ['./add-map-marker.component.scss'],
})
export class AddMapMarkerComponent implements OnInit {
  markerForm: FormGroup;

  constructor(
    private readonly injMarker: BaseMarker,
    private readonly store: Store<any>,
  ) {
    this.markerForm = new FormGroup({
      lat: new FormControl(injMarker.lat, [Validators.required]),
      lng: new FormControl(injMarker.lng, [Validators.required]),
      hidden: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  public submit = (): void => {
    const formData = this.markerForm.value;
    this.store.dispatch(
      MapMarkerActions.createMapMarker({
        mapMarker: {
          hidden: formData.hidden,
          lat: formData.lat,
          lng: formData.lng,
          productIds: [],
        },
      }),
    );
  };
}
