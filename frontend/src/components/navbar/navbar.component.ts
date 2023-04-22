import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavigationItem } from '../../common/interfaces';
import { AuthWrapperService } from '../../services';
import { Subject, takeUntil } from 'rxjs';

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
      asButton: false,
    },
    {
      label: 'Приєднатись до команди',
      asButton: false,
    },
    {
      label: 'FAQ',
      asButton: false,
    },
  ];

  private readonly unsubscribe$ = new Subject();

  constructor(public authWrapperService: AuthWrapperService) {}

  ngOnInit() {
    this.authWrapperService.isAuthenticated$.pipe(takeUntil(this.unsubscribe$)).subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
