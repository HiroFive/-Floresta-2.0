import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MapMarkerActions } from '../../../../store/actions';
import { BaseMarker } from '../../../../common/classes';
import { Store } from '@ngrx/store';
import { ProductSelectors } from '../../../../store/selectors';
import { take } from 'rxjs';
import { IProduct } from '../../../../common/interfaces';
import { ModalService } from '../../../../services';

@Component({
  selector: 'app-add-map-marker-form',
  templateUrl: './edit-map-marker-form.component.html',
  styleUrls: ['./edit-map-marker-form.component.scss'],
})
export class EditMapMarkerFormComponent implements OnInit {
  markerForm: FormGroup;
  mapMarketId: number;
  productsOptions: any;

  constructor(
    private readonly injMarker: BaseMarker,
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
  ) {
    this.mapMarketId = injMarker.id || 0;
    this.markerForm = new FormGroup({
      lat: new FormControl(injMarker.lat, [Validators.required]),
      lng: new FormControl(injMarker.lng, [Validators.required]),
      productIds: new FormControl([], [Validators.required]),
      hidden: new FormControl(injMarker.hidden),
    });
  }

  get productIdsControl(): AbstractControl {
    return this.markerForm.get('productIds') as AbstractControl;
  }

  ngOnInit(): void {
    this.store
      .select(ProductSelectors.getAllProducts)
      .pipe(take(1))
      .subscribe((products) => {
        this.productsOptions = products;
        this.setProductIds();
      });
  }

  setProductIds() {
    const products = this.productsOptions.filter((product: IProduct) =>
      this.injMarker.productIds?.includes(product?.id || 0),
    );

    this.productIdsControl.setValue(
      products.map((product: IProduct) => {
        return product.id;
      }),
    );
  }

  public closeModal() {
    this.modalService.closeModal();
  }

  public submit = (): void => {
    const formData = this.markerForm.value;

    this.store.dispatch(
      MapMarkerActions.updateMarker({
        id: this.mapMarketId,
        mapMarker: {
          hidden: formData.hidden,
          lat: formData.lat,
          lng: formData.lng,
          productIds: formData.productIds,
        },
      }),
    );
  };
}
