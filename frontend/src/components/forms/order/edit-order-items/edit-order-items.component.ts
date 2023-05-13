import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/actions';
import { BaseOrder } from '../../../../common/classes';
import { Subject, takeUntil } from 'rxjs';
import { ProductSelectors } from '../../../../store/selectors';
import { IProduct } from '../../../../common/interfaces';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-order-items.component.html',
  styleUrls: ['./edit-order-items.component.scss'],
})
export class EditOrderItemsComponent implements OnInit, OnDestroy {
  orderId: number;
  markerId: number;
  productsCatalog: Array<IProduct>;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private InjProduct: BaseOrder,
    private readonly store: Store<any>,
  ) {
    this.markerId = InjProduct.markerId || 0;
    this.orderId = InjProduct.id || 0;
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getCatalog({ id: this.markerId }));

    this.store
      .select(ProductSelectors.getProductsCatalog)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((productsCatalog) => {
        this.productsCatalog = productsCatalog;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
