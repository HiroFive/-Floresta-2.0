import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../../common/interfaces';
import { TableTypeEnum } from '../../../common/enums';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalService } from '../../../services';
import { CartActions } from '../../../store/actions';
import { BaseUser, User } from '../../../common/classes';
import { EditUserFormComponent } from '../../../components/forms';
import { DeleteUserComponent } from '../../../components/delete-dialog/delete-user.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  orders: Array<any>;
  tableColumns = ['id', 'img', 'name', 'price', 'hidden'];
  tableTypeEnum = TableTypeEnum;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit() {
    // this.store.dispatch(UserActions.getAllUsers());
    // this.store.dispatch(UserActions.getUserRoles());
    //
    // this.store
    //   .select(UserSelectors.getAllUsers)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((users) => {
    //     this.users = users;
    //   });
  }

  updatedSelectedUser(userData: IUser): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseUser,
          useValue: new User(
            userData.id,
            userData.subId,
            userData.email,
            userData.name,
            userData.role || '',
          ),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(
      EditUserFormComponent,
      injector,
      'Редагувати користувача',
    );
  }

  deleteSelectedUser(userData: IUser): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseUser,
          useValue: new User(userData.id, '', '', userData.name),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(DeleteUserComponent, injector);
  }

  cleanUserCart(userData: IUser): void {
    this.store.dispatch(
      CartActions.deleteCartByUserId({ id: userData.id || '' }),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
