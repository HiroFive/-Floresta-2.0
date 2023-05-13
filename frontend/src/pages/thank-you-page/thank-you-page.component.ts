import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { USER_PROFILE } from '../../common/local-storage-keys';
import { CartActions, OrderActions } from '../../store/actions';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../services';
import { OrderSelectors } from '../../store/selectors';
import { IOrderDetails } from '../../common/interfaces';
import { RouterPathEnum } from '../../common/enums';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
})
export class ThankYouPageComponent implements OnInit, OnDestroy {
  orderNumber: number;
  orderDetails: IOrderDetails;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<any>,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const userId = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || {},
    )?.id;
    this.store.dispatch(CartActions.getCartByUserId({ id: userId }));

    this.activatedRoute.queryParams
      .pipe(
        take(1),
        filter((params) => !!params?.['orderNumber']),
      )
      .subscribe(({ orderNumber }) => {
        this.orderNumber = Number(orderNumber);
        this.store.dispatch(
          OrderActions.getOrderDetails({ orderNumber: this.orderNumber }),
        );
      });

    this.store
      .select(OrderSelectors.getOrderDetails)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orderDetails) => (this.orderDetails = orderDetails));
  }

  navigateToHome(): void {
    this.router.navigate([RouterPathEnum.Home]);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
