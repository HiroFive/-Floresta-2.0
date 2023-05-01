import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/actions';
import { UserSelectors } from '../../../store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../../common/interfaces';
import { TableTypeEnum } from '../../../common/enums';
import { BaseUser, User } from '../../../common/classes';
import { ModalService } from '../../../services';
import { DeleteUserComponent } from '../../../components/forms/delete/delete-user.component';
import { EditUserFormComponent } from '../../../components/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersComponentPage implements OnInit, OnDestroy {
  users: Array<IUser>;
  tableColumns = ['id', 'name', 'email', 'role'];
  tableTypeEnum = TableTypeEnum;

  protected readonly console = console;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit() {
    this.store.dispatch(UserActions.getAllUsers());

    this.store
      .select(UserSelectors.getAllUsers)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.users = users;
      });
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

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
