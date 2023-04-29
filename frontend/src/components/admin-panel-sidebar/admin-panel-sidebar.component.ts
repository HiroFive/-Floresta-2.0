import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel-sidebar',
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrls: ['./admin-panel-sidebar.component.scss'],
})
export class AdminPanelSidebarComponent {
  sideBarItems = [
    {
      link: 'orders',
      icon: 'file-text-outline',
      label: 'Замовлення',
    },
    {
      link: 'map-mark-setting',
      icon: 'pin-outline',
      label: 'Мітки',
    },
    {
      link: 'products-setting',
      icon: 'pricetags-outline',
      label: 'Продукти',
    },
    {
      link: 'users-setting',
      icon: 'people-outline',
      label: 'Користувачі',
    },
  ];
}
