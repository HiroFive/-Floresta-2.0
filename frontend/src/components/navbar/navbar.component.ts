import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavigationItem } from '../../common/interfaces';
import { AuthWrapperService, LocalStorageService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { USER_PROFILE } from '../../common/local-storage-keys';
import { RouterPathEnum, UserRolesEnum } from '../../common/enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserAuthenticated: boolean = false;

  navigationMenuItems: Array<INavigationItem> = [
    {
      label: 'Посадити дерева',
      asButton: true,
    },
    {
      label: 'Доступні міста',
      link: `${RouterPathEnum.Home}#google-map`,
      asButton: false,
    },
    {
      label: 'FAQ',
      link: `${RouterPathEnum.Home}#FAQ`,
      asButton: false,
    },
  ];

  contextMenuList: Array<any>;

  private readonly unsubscribe$ = new Subject();

  constructor(
    public authWrapperService: AuthWrapperService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.authWrapperService.isAuthenticated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated) => {
        this.isUserAuthenticated = isAuthenticated;
        this.setContextMenuList();
      });
  }

  setContextMenuList(): void {
    const userRole = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || {},
    )?.role;

    this.contextMenuList =
      userRole === UserRolesEnum.Admin
        ? [
            { title: 'Мій профіль', link: RouterPathEnum.Profile },
            { title: 'Адмін панель', link: RouterPathEnum.Admin },
            { title: 'Вихід', link: RouterPathEnum.Logout },
          ]
        : [
            { title: 'Мій профіль', link: RouterPathEnum.Profile },
            { title: 'Вихід', link: RouterPathEnum.Logout },
          ];
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
