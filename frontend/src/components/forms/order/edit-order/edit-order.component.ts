import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BaseOrder } from '../../../../common/classes';
import {
  OrderStatusEnum,
  OrderStatusTitleEnum,
} from '../../../../common/enums';
import { OrderActions } from '../../../../store/actions';
import { ModalService } from '../../../../services';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  orderFormGroup: FormGroup;
  id: number;
  statsOptions: Array<any>;

  constructor(
    private InjProduct: BaseOrder,
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
  ) {
    this.id = InjProduct.id || 0;
    this.orderFormGroup = new FormGroup({
      status: new FormControl(0),
      type: new FormControl(InjProduct.type),
    });
  }

  ngOnInit(): void {
    this.statsOptions = [
      {
        id: OrderStatusEnum.Created,
        name: OrderStatusTitleEnum.Created,
      },
      {
        id: OrderStatusEnum.InProcess,
        name: OrderStatusTitleEnum.InProcess,
      },
      {
        id: OrderStatusEnum.Canceled,
        name: OrderStatusTitleEnum.Canceled,
      },
      {
        id: OrderStatusEnum.Completed,
        name: OrderStatusTitleEnum.Completed,
      },
    ];
  }

  public closeModal() {
    this.modalService.closeModal();
  }

  public submit = (): void => {
    const formData = this.orderFormGroup.value;
    this.store.dispatch(
      OrderActions.updateOrderStatus({ id: this.id, status: formData?.status }),
    );
  };
}
