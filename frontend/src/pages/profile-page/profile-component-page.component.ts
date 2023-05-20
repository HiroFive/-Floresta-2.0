import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { ProfileSelectors } from '../../store/selectors';
import { NbMenuItem } from '@nebular/theme';
import { profileMenuConstants } from '../../common/consts/profile-menu.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../common/interfaces';
import { ProfileActions } from '../../store/actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-component-page.component.html',
  styleUrls: ['./profile-component-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  items: NbMenuItem[] = profileMenuConstants;
  userForm: FormGroup;
  profile: IUser;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.email,
      ]),
    });
  }
  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.getProfile)
      .pipe(
        filter((profile) => !!profile),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((profile) => {
        this.profile = profile;
        this.prefillUserForm(profile);
      });
  }

  prefillUserForm(profile: IUser): void {
    this.userForm.patchValue({ name: profile.name, email: profile.email });
  }

  updateProfile(): void {
    const formData = this.userForm.value;
    this.store.dispatch(
      ProfileActions.updateProfile({
        id: this.profile.id as string,
        user: {
          name: formData?.name,
          email: formData?.email,
        } as any,
      }),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
