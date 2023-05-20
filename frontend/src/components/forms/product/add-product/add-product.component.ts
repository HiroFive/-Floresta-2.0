import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseProduct } from '../../../../common/classes';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/actions';
import { Subject } from 'rxjs';
import { ModalService } from '../../../../services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productFormGroup: FormGroup;
  files: File[] = [];

  private readonly unsubscribe$ = new Subject();
  constructor(
    private InjProduct: BaseProduct,
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
  ) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      hidden: new FormControl(false),
      price: new FormControl(1, [Validators.required]),
    });
  }

  public onSelect(event: any) {
    this.files.shift();
    this.files.push(...event.addedFiles);
  }

  public onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }

  public closeModal() {
    this.modalService.closeModal();
  }

  public submit = (): void => {
    const formData = new FormData();
    formData.append('image', this.files[0]);
    formData.append('data', JSON.stringify(this.productFormGroup.value));
    this.store.dispatch(ProductActions.createProduct({ product: formData }));
  };
}
