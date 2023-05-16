import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { profileMenuConstants } from '../../common/consts/profile-menu.constants';
import { filter, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../../store/actions';
import { ProfileSelectors } from '../../store/selectors';
import { IOrderDetails } from '../../common/interfaces';
import { OrderStatusEnum, OrderStatusTitleEnum } from '../../common/enums';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.scss'],
})
export class OrderHistoryPageComponent implements OnInit, OnDestroy {
  items: NbMenuItem[] = profileMenuConstants;
  orderHistory: Array<IOrderDetails>;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(ProfileActions.getOrderHistory());

    this.store
      .select(ProfileSelectors.getOrderHistory)
      .pipe(
        filter((orderHistory) => !!orderHistory.length),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((orderHistory) => {
        this.orderHistory = orderHistory;
      });
  }

  getStatusTitle(status: number): string {
    switch (status) {
      case OrderStatusEnum.Created:
        return OrderStatusTitleEnum.Created;
      case OrderStatusEnum.Canceled:
        return OrderStatusTitleEnum.Canceled;
      case OrderStatusEnum.InProcess:
        return OrderStatusTitleEnum.InProcess;
      case OrderStatusEnum.Completed:
        return OrderStatusTitleEnum.Completed;
      default:
        return OrderStatusTitleEnum.Created;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
