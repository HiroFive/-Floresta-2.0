import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICart, ICartItem, IProduct } from '../../common/interfaces';
import { Store } from '@ngrx/store';
import { CartActions } from '../../store/actions';
import { CartSelectors } from '../../store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;

  cart: ICart;
  timeoutPromise!: ReturnType<typeof setTimeout>;
  quantityControl = new FormControl(0);
  changeQuantityStep = 1;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}

  get cartItem(): ICartItem {
    return this.cart?.items?.find(
      (item) => item?.productId === this.product?.id,
    ) as ICartItem;
  }

  get showRemoveButton(): boolean {
    return !!this.cartItem?.id;
  }

  get showAddButton(): boolean {
    return !this.cartItem?.id ?? false;
  }

  ngOnInit() {
    this.store
      .select(CartSelectors.getCart)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cart) => {
        this.cart = cart;

        this.quantityControl.patchValue(this.cartItem?.quantity || 1, {
          emitEvent: false,
        });
      });

    this.quantityControl?.valueChanges.subscribe((quantity) => {
      if (this.cartItem?.id) {
        this.updateCartItem(quantity || 0);
      }

      return quantity;
    });
  }

  addProductToCart(): void {
    this.store.dispatch(
      CartActions.createCartItem({
        cartItem: {
          productId: this.product.id || 0,
          cartId: this.cart.id || 0,
          quantity: this.quantityControl.value,
        },
      }),
    );
  }

  deleteCartItem(): void {
    this.store.dispatch(
      CartActions.deleteCartItemById({ ids: [this.cartItem?.id] }),
    );
  }

  updateCartItem(quantity: number): void {
    clearTimeout(this.timeoutPromise);

    this.timeoutPromise = setTimeout(() => {
      this.store.dispatch(
        CartActions.updateCartItem({
          id: this.cartItem?.id,
          cartItem: { quantity },
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
