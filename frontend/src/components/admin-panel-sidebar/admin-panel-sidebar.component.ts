import { Component } from '@angular/core';
import { RouterPathEnum } from '../../common/enums';

@Component({
  selector: 'app-admin-panel-sidebar',
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrls: ['./admin-panel-sidebar.component.scss'],
})
export class AdminPanelSidebarComponent {
  sideBarItems = [
    {
      link: RouterPathEnum.Orders,
      icon: 'file-text-outline',
      label: 'Замовлення',
    },
    {
      link: RouterPathEnum.MapMarks,
      icon: 'pin-outline',
      label: 'Мітки',
    },
    {
      link: RouterPathEnum.Products,
      icon: 'pricetags-outline',
      label: 'Продукти',
    },
    {
      link: RouterPathEnum.Users,
      icon: 'people-outline',
      label: 'Користувачі',
    },
  ];
}
