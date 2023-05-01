import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseUser } from '../../../common/classes';
import { UserActions } from '../../../store/actions';
import { ModalService } from '../../../services';

@Component({
  selector: 'app-category-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteUserComponent {
  userId: string;
  message: string;
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private readonly injUser: BaseUser,
  ) {
    this.userId = this.injUser?.id || '';
    this.message = `Ви справді хочете видалити цьго користувача ${this.injUser.name}? Цей процес не можна буде відмінити`;
  }

  public closeModal(): void {
    this.modalService.changeOpenState(false);
  }
  public delete(): void {
    this.store.dispatch(UserActions.deleteUserById({ id: this.userId }));
    this.modalService.changeOpenState(false);
  }
}
