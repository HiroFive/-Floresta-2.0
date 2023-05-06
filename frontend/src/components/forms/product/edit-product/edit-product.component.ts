import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseProduct } from '../../../../common/classes';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productFormGroup: FormGroup;
  files: File[] = [];
  id: number;

  constructor(
    private InjProduct: BaseProduct,
    private readonly store: Store<any>,
  ) {
    this.id = InjProduct.id || 0;
    this.productFormGroup = new FormGroup({
      name: new FormControl(InjProduct.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      image: new FormControl(InjProduct.image),
      hidden: new FormControl(InjProduct.hidden),
      price: new FormControl(InjProduct.price, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public onSelect(event: any) {
    this.files.shift();
    this.files.push(...event.addedFiles);
  }

  public onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public submit = (): void => {
    const formData = new FormData();

    if (this.files.length !== 0) {
      formData.append('image', this.files[0]);
    }

    formData.append('data', JSON.stringify(this.productFormGroup.value));
    this.store.dispatch(
      ProductActions.updateProduct({ id: this.id, product: formData }),
    );
  };
}
