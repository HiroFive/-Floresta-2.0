import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions, ProductActions } from '../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, Subject, take, takeUntil } from 'rxjs';
import { CartSelectors, ProductSelectors } from '../../store/selectors';
import { ICart, IProduct } from '../../common/interfaces';
import { RouterPathEnum } from '../../common/enums';
import { LocalStorageService, ModalService } from '../../services';
import {
  BaseCartItemsForDelete,
  CartItemsForDelete,
} from '../../common/classes';
import { ClearCartItemsWarningComponent } from '../../components/info-dialog/clear-cart-items-warning.component';
import { USER_PROFILE } from '../../common/local-storage-keys';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  modalState: { content: any; open: boolean; injector: any };
  productsCatalog: Array<IProduct>;
  idsForCartItemDelete: Array<number>;
  cart: ICart;
  markerId = 0;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly localStorageService: LocalStorageService,
    private inj: Injector,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        filter((params) => !!params?.['id']),
      )
      .subscribe(({ id }) => {
        this.markerId = Number(id);
        this.store.dispatch(ProductActions.getCatalog({ id }));
      });

    const userId = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || {},
    )?.id;
    this.store.dispatch(CartActions.getCartByUserId({ id: userId }));

    combineLatest([
      this.store.select(ProductSelectors.getProductsCatalog),
      this.store.select(CartSelectors.getCart),
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([productsCatalog, cart]) => {
        this.cart = cart;
        this.productsCatalog = productsCatalog;

        if (cart?.items?.length) {
          this.findIdsForCartItemsDelete();

          if (this.isShowingWarningDialog) {
            this.showWarningDialog();
          }
        }
      });

    this.modalService.modalSource.subscribe(
      (value: any) => (this.modalState = value),
    );
  }

  showWarningDialog(): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseCartItemsForDelete,
          useValue: new CartItemsForDelete(this.idsForCartItemDelete),
        },
      ],
      parent: this.inj,
    });

    this.modalService.openNewModal(ClearCartItemsWarningComponent, injector);
  }

  findIdsForCartItemsDelete(): void {
    const cartItems = this.cart.items;
    this.idsForCartItemDelete =
      cartItems
        ?.filter(
          (item) =>
            !this.productsCatalog?.some((obj) => obj.id === item.productId),
        )
        .map((item) => item.id) || [];
  }

  get isShowingWarningDialog(): boolean {
    return !!this.cart?.items?.length && !!this.productsCatalog?.length
      ? !!this.idsForCartItemDelete?.length
      : false;
  }

  get productsSubTotal(): number {
    return (
      this.cart?.items?.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ) || 0
    );
  }

  get isDisableCheckoutButton(): boolean {
    return !this.cart?.items?.length;
  }

  navigateToCheckout(): void {
    this.router.navigate([RouterPathEnum.Checkout], {
      queryParams: { id: this.markerId },
    });
  }

  back(): void {
    this.router.navigate([RouterPathEnum.Home]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
