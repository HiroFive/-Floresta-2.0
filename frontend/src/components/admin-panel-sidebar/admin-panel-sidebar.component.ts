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
      link: 'map-marks',
      icon: 'pin-outline',
      label: 'Мітки',
    },
    {
      link: 'products',
      icon: 'pricetags-outline',
      label: 'Продукти',
    },
    {
      link: 'users',
      icon: 'people-outline',
      label: 'Користувачі',
    },
  ];
}
