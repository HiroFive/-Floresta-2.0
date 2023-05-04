import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserActions } from '../../../../store/actions';
import { BaseUser } from '../../../../common/classes';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../../../../store/selectors';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IUserRoles } from '../../../../common/interfaces';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  userRolesOptions: Array<IUserRoles>;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly injUser: BaseUser,
    private readonly store: Store<any>,
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(this.injUser.name, [Validators.required]),
      email: new FormControl(this.injUser.email, [Validators.required]),
      role: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.store
      .select(UserSelectors.getUserRoles)
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe((roles) => {
        this.userRolesOptions = roles;
        this.setUserRole();
      });
  }

  get RoleControl(): AbstractControl {
    return this.userForm.get('role') as AbstractControl;
  }

  setUserRole() {
    const userRole = this.userRolesOptions.filter(
      (role) => this.injUser.role === role.name,
    );

    this.RoleControl.setValue(userRole?.[0]?.id);
  }

  public submit = (): void => {
    const formData = this.userForm.value;
    this.store.dispatch(
      UserActions.updateUser({
        id: this.injUser.id,
        user: { name: formData?.name, roleId: formData?.role } as any,
      }),
    );
  };

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
