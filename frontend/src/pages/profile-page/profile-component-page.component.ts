import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { ProfileSelectors } from '../../store/selectors';
import { NbMenuItem } from '@nebular/theme';
import { ProfileActions } from '../../store/actions';
import { profileMenuConstants } from '../../common/consts/profile-menu.constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-component-page.component.html',
  styleUrls: ['./profile-component-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  items: NbMenuItem[] = profileMenuConstants;

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(ProfileActions.getOrderHistory());

    this.store
      .select(ProfileSelectors.getOrderHistory)
      .pipe(
        filter((orderHistory) => !!orderHistory.length),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((orderHistory) => {
        console.log(orderHistory);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
