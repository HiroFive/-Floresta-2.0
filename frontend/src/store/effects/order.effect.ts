import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ModalService, OrderService } from '../../services';
import { CartActions, OrderActions } from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterPathEnum } from '../../common/enums';
import { Store } from '@ngrx/store';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private readonly store: Store<any>,
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      mergeMap((action) =>
        this.orderService.createOrder(action.orderDto).pipe(
          tap(({ id }) => {
            this.router.navigate([RouterPathEnum.ThankYou], {
              queryParams: { orderNumber: id },
            });
          }),
          map(() => OrderActions.createOrderSuccess()),
          catchError(() => of(OrderActions.createOrderFailed())),
        ),
      ),
    ),
  );

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getOrderDetails),
      mergeMap((action) =>
        this.orderService.getOrderDetails(action.orderNumber).pipe(
          map((order) =>
            OrderActions.getOrderDetailsSuccess({ orderDetails: order }),
          ),
          catchError(() => of(OrderActions.getOrderDetailsFailed())),
        ),
      ),
    ),
  );

  getAllOrderDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getAllOrderDetails),
      mergeMap((action) =>
        this.orderService.getAllOrders().pipe(
          map((orders) =>
            OrderActions.getAllOrderDetailsSuccess({ allOrderDetails: orders }),
          ),
          catchError(() => of(OrderActions.getAllOrderDetailsFailed())),
        ),
      ),
    ),
  );

  updateOrderStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderStatus),
      mergeMap((action) =>
        this.orderService
          .updateOrderStatus(action?.id, `${action?.status}`)
          .pipe(
            map(() => {
              if (this.modalService?.isOpen) {
                this.modalService.changeOpenState(false);
              }

              return OrderActions.updateOrderStatusSuccess({
                id: action?.id,
                status: action.status,
              });
            }),
            catchError(() => of(OrderActions.updateOrderStatusFailed())),
          ),
      ),
    ),
  );

  createOrderItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrderItem),
      mergeMap((action) =>
        this.orderService
          .createOrderItem({
            productId: action.productId,
            orderId: action.orderId,
            quantity: action.quantity || 1,
          })
          .pipe(
            map(() => {
              if (this.modalService?.isOpen) {
                this.modalService.changeOpenState(false);
              }

              return OrderActions.createOrderItemSuccess();
            }),
            tap(() => {
              this.store.dispatch(OrderActions.getAllOrderDetails());
            }),
            catchError(() => of(OrderActions.createOrderItemFailed())),
          ),
      ),
    ),
  );

  updateOrderItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderItem),
      mergeMap((action) =>
        this.orderService.updateOrderItem(action.id, action.quantity).pipe(
          map(() => {
            if (this.modalService?.isOpen) {
              this.modalService.changeOpenState(false);
            }

            return OrderActions.updateOrderItemSuccess({
              id: action.id,
              quantity: action.quantity,
              orderId: action.orderId,
            });
          }),
          catchError(() => of(OrderActions.updateOrderItemFailed())),
        ),
      ),
    ),
  );

  deleteOrderItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrderItemById),
      mergeMap((action) =>
        this.orderService.deleteOrderItem(action.id).pipe(
          map(() => {
            if (this.modalService?.isOpen) {
              this.modalService.changeOpenState(false);
            }

            return OrderActions.deleteOrderItemByIdSuccess({
              id: action.id,
              orderId: action.orderId,
            });
          }),
          catchError(() => of(CartActions.deleteCartItemByIdFailed())),
        ),
      ),
    ),
  );
}
