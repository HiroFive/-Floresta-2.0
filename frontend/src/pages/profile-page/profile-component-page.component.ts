import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { ProfileSelectors } from '../../store/selectors';
import { NbMenuItem } from '@nebular/theme';
import { RouterPathEnum } from '../../common/enums';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-component-page.component.html',
  styleUrls: ['./profile-component-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  items: NbMenuItem[] = [
    {
      title: 'Мій профіль',
      link: `/${RouterPathEnum.Profile}`,
      icon: 'person-outline',
    },
    {
      title: 'Мої замовлення',
      link: `/${RouterPathEnum.Orders}`,
      icon: 'shopping-bag-outline',
    },
  ];

  private readonly unsubscribe$ = new Subject();
  constructor(private readonly store: Store<any>) {}
  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.getProfile)
      .pipe(
        filter((profile) => !!profile?.id),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((profile) => {
        console.log(profile);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
