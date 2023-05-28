import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { IOrderDetails } from '../../../common/interfaces';
import {
  OrderStatusEnum,
  OrderStatusTitleEnum,
  TableTypeEnum,
} from '../../../common/enums';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalService } from '../../../services';
import { OrderActions } from '../../../store/actions';
import { BaseOrder, Order } from '../../../common/classes';
import { OrderSelectors } from '../../../store/selectors';
import { EditOrderComponent } from '../../../components/forms/order/edit-order/edit-order.component';
import { EditOrderItemsComponent } from '../../../components/forms/order/edit-order-items/edit-order-items.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders: Array<any>;
  tableColumns = [
    { dataField: 'status', dataType: 'string' },
    { dataField: 'mapMarker', dataType: 'number' },
    { dataField: 'payment', dataType: 'string' },
    { dataField: 'total', dataType: 'number' },
    { dataField: 'user', dataType: 'string' },
    { dataField: 'created', dataType: 'date' },
  ];
  tableTypeEnum = TableTypeEnum;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit() {
    this.store.dispatch(OrderActions.getAllOrderDetails());

    this.store
      .select(OrderSelectors.getAllOrderDetails)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orders) => {
        this.orders = this.mapOrderForDataTable(orders);
      });
  }

  mapOrderForDataTable(orders: Array<IOrderDetails>): Array<any> {
    return (
      orders?.map((order) => {
        return {
          id: order.id,
          mapMarker: order.mapMarkerId,
          status: this.getStatusTitle(order.status),
          total: Number(order.total),
          payment: order.paymentDetails.provider,
          user: order?.user?.name,
          created: new Date(order.createdAt),
        };
      }) || []
    );
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

  updatedSelectedOrder(order: IOrderDetails): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseOrder,
          useValue: new Order(order.status, order.id),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(
      EditOrderComponent,
      injector,
      'Змінити статус замовлення',
    );
  }

  openOrderItemDialog(order: any): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseOrder,
          useValue: new Order(order.status, order.id, order.mapMarker),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(
      EditOrderItemsComponent,
      injector,
      'Змінити склад замвлення',
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
