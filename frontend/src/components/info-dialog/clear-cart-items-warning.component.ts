import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseCartItemsForDelete } from '../../common/classes';
import { CartActions } from '../../store/actions';
import { ModalService } from '../../services';
import { RouterPathEnum } from '../../common/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog-user',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class ClearCartItemsWarningComponent {
  deleteIds: Array<number>;
  message: string;

  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private readonly injCartItemsForDelete: BaseCartItemsForDelete,
    private readonly router: Router,
  ) {
    this.deleteIds = injCartItemsForDelete.cartItemIds;
    this.message = `Деякі з продуктів, які ви добавили раніше, не доступні для даної ділянки. Дозволете нам їх видалити?`;
  }

  public closeModal(): void {
    this.router.navigate([RouterPathEnum.Home]);
  }
  public delete(): void {
    this.store.dispatch(
      CartActions.deleteCartItemById({ ids: this.deleteIds }),
    );
    this.modalService.changeOpenState(false);
  }
}
