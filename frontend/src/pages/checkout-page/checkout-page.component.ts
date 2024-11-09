import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { CartSelectors } from '../../store/selectors';
import { ICart, ICartItem } from '../../common/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { PaymentProvideEnum, RouterPathEnum } from '../../common/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderActions } from '../../store/actions';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  orderSubtotal = 0;
  orderTotal = 0;
  form: FormGroup;
  markerId = 0;
  orderItems: Array<ICartItem> = [];
  orderType = '';

  anonymousControl = new FormControl(false);

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        take(1),
        filter((params) => !!params?.['id']),
      )
      .subscribe(({ id, orderType }) => {
        this.markerId = Number(id);
        this.orderType = orderType || 'general';
      });

    this.form = this.fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expirationDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });

    this.store
      .select(CartSelectors.getCart)
      .pipe(
        filter((cart) => !!cart?.id),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((cart) => {
        this.serOrderTotal(cart);
        this.orderItems = cart?.items;
      });
  }

  serOrderTotal(cart: ICart): void {
    this.orderSubtotal =
      cart?.items?.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      ) || 0;
    const tax10 = this.orderSubtotal * 0.1;
    this.orderTotal = this.orderSubtotal + tax10;
  }

  onSubmit() {
    const orderDto = {
      total: this.orderTotal,
      type: this.orderType,
      mapMarkerId: this.markerId,
      isAnonymous: this.anonymousControl.value || false,
      items: this.orderItems.map(({ productId, name, quantity }) => ({
        productId,
        name,
        quantity,
      })) as any,
      payment: {
        provider: PaymentProvideEnum.CreditCard,
      },
    };

    this.store.dispatch(OrderActions.createOrder({ orderDto }));
  }

  navigateToCatalog(): void {
    this.router.navigate([RouterPathEnum.Catalog], {
      queryParams: { id: this.markerId },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
