import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapMarkerActions } from '../../../../store/actions';
import { BaseMarker } from '../../../../common/classes';
import { Store } from '@ngrx/store';
import { ProductSelectors } from '../../../../store/selectors';
import { take } from 'rxjs';
import { ModalService } from '../../../../services';

@Component({
  selector: 'app-add-map-marker-form',
  templateUrl: './add-map-marker-form.component.html',
  styleUrls: ['./add-map-marker-form.component.scss'],
})
export class AddMapMarkerFormComponent implements OnInit {
  markerForm: FormGroup;
  productsOptions: any;

  constructor(
    private readonly injMarker: BaseMarker,
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
  ) {
    this.markerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      lat: new FormControl(injMarker.lat, [Validators.required]),
      lng: new FormControl(injMarker.lng, [Validators.required]),
      productIds: new FormControl([], [Validators.required]),
      hidden: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.store
      .select(ProductSelectors.getAllProducts)
      .pipe(take(1))
      .subscribe((products) => {
        this.productsOptions = products;
      });
  }

  public closeModal() {
    this.modalService.closeModal();
  }

  public submit = (): void => {
    const formData = this.markerForm.value;
    this.store.dispatch(
      MapMarkerActions.createMapMarker({
        mapMarker: {
          name: formData.name,
          description: formData.description,
          hidden: formData.hidden,
          lat: formData.lat,
          lng: formData.lng,
          productIds: formData.productIds,
        },
      }),
    );
  };
}
