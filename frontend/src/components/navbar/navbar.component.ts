import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
  isUserAuthenticated = false;
  isSubMenuOpen = false;
  isTabletView = false;

  navigationMenuItems: Array<INavigationItem> = [
    {
      label: 'Посадити дерева',
      link: `/${RouterPathEnum.Home}`,
      fragment: 'google-map',
      asButton: true,
    },
    {
      label: 'Доступні міста',
      link: `/${RouterPathEnum.Home}`,
      fragment: 'google-map',
      asButton: false,
    },
    {
      label: 'FAQ',
      link: `/${RouterPathEnum.Home}`,
      fragment: 'FAQ',
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
    this.isTabletView = this.isTabletViewCalc;
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

  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    this.isTabletView = this.isTabletViewCalc;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  get isTabletViewCalc(): boolean {
    return window.innerWidth <= 1024;
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
