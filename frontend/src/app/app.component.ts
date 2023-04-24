import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import {
  AuthWrapperService,
  LocalStorageService,
  UserService,
} from '../services';
import { Store } from '@ngrx/store';
import { CartActions, ProfileActions } from '../store/actions';
import { ProfileSelectors } from '../store/selectors';
import { isEmpty } from 'lodash';
import { USER_PROFILE } from '../common/local-storage-keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly authWrapperService: AuthWrapperService,
    private readonly store: Store<any>,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    combineLatest([
      this.store.select(ProfileSelectors.getProfile),
      this.authWrapperService.authService.idTokenClaims$,
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([profile, idToken]) => {
        if (isEmpty(profile) && idToken?.['sub']) {
          this.store.dispatch(
            ProfileActions.createUserProfile({
              user: this.userService.userTokenToProps(idToken),
            }),
          );
        }

        if (profile?.id) {
          this.localStorageService.setItem(USER_PROFILE, profile);
          this.store.dispatch(CartActions.getCartByUserId({ id: profile?.id }));
        }
      });

    this.authWrapperService.authService.idTokenClaims$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((token) =>
        this.store.dispatch(
          ProfileActions.getProfileInfoById({ id: token?.['sub'] }),
        ),
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
