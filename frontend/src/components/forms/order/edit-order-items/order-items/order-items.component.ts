import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IOrderDetails,
  IOrderItem,
  IProduct,
} from '../../../../../common/interfaces';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrderSelectors } from '../../../../../store/selectors';
import { OrderActions } from '../../../../../store/actions';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  @Input() orderId: number;

  order: IOrderDetails;
  timeoutPromise!: ReturnType<typeof setTimeout>;
  quantityControl = new FormControl(0);
  changeQuantityStep = 1;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}

  get orderItem(): IOrderItem {
    return this.order?.items?.find(
      (item) => item?.productId === this.product?.id,
    ) as IOrderItem;
  }

  get showRemoveButton(): boolean {
    return !!this.orderItem?.id;
  }

  get showAddButton(): boolean {
    return !this.orderItem?.id ?? false;
  }

  ngOnInit() {
    this.store
      .select(OrderSelectors.getAllOrderDetails)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orders) => {
        this.order = orders.find(
          (item: IOrderDetails) => item?.id === this.orderId,
        );

        this.quantityControl.patchValue(this.orderItem?.quantity || 1, {
          emitEvent: false,
        });
      });

    this.quantityControl?.valueChanges.subscribe((quantity) => {
      if (this.orderItem?.id) {
        this.updateCartItem(quantity || 0);
      }

      return quantity;
    });
  }

  addProductToCart(): void {
    this.store.dispatch(
      OrderActions.createOrderItem({
        productId: this.product.id || 0,
        orderId: this.orderId,
        quantity: this.quantityControl.value,
      }),
    );
  }

  deleteCartItem(): void {
    this.store.dispatch(
      OrderActions.deleteOrderItemById({
        id: this.orderItem?.id,
        orderId: this.orderId,
      }),
    );
  }

  updateCartItem(quantity: number): void {
    clearTimeout(this.timeoutPromise);

    this.timeoutPromise = setTimeout(() => {
      this.store.dispatch(
        OrderActions.updateOrderItem({
          id: this.orderItem?.id,
          orderId: this.orderId,
          quantity,
        }),
      );
    }, 500);
  }

  changeQuantityUp(): void {
    const currentQuantityValue = this.quantityControl.value || 0;
    const newQuantityValue = currentQuantityValue + this.changeQuantityStep;

    if (newQuantityValue <= 15) {
      this.quantityControl.patchValue(newQuantityValue);
    }
  }

  changeQuantityDown(): void {
    const currentQuantityValue = this.quantityControl.value || 0;
    const newQuantityValue = currentQuantityValue - this.changeQuantityStep;

    if (newQuantityValue >= 1) {
      this.quantityControl.patchValue(newQuantityValue);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
