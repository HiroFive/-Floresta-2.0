import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseProduct } from '../../../common/classes';
import { ProductActions } from '../../../store/actions';
import { ModalService } from '../../../services';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteProductComponent {
  productId: number;
  message: string;
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private readonly injProduct: BaseProduct,
  ) {
    this.productId = this.injProduct?.id || 0;
    this.message = `Ви справді хочете видалити цей саджанець #${this.productId}? Цей процес не можна буде відмінити`;
  }

  public closeModal(): void {
    this.modalService.changeOpenState(false);
  }
  public delete(): void {
    this.store.dispatch(
      ProductActions.deleteProductById({ id: this.productId }),
    );
    this.modalService.changeOpenState(false);
  }
}
