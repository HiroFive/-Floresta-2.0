import { Component } from '@angular/core';
import { RouterPathEnum } from '../../common/enums';
import { NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-sidebar',
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrls: ['./admin-panel-sidebar.component.scss'],
})
export class AdminPanelSidebarComponent {
  sideBarItems: NbMenuItem[] = [
    {
      link: RouterPathEnum.Orders,
      icon: 'file-text-outline',
      title: 'Замовлення',
    },
    {
      link: RouterPathEnum.MapMarks,
      icon: 'pin-outline',
      title: 'Мітки',
    },
    {
      link: RouterPathEnum.Products,
      icon: 'pricetags-outline',
      title: 'Продукти',
    },
    {
      link: RouterPathEnum.Users,
      icon: 'people-outline',
      title: 'Користувачі',
    },
  ];

  constructor(private readonly router: Router) {}

  backToHomePage(): void {
    this.router.navigate([RouterPathEnum.Home]);
  }
}
