import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel-sidebar',
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrls: ['./admin-panel-sidebar.component.scss'],
})
export class AdminPanelSidebarComponent {
  sideBarItems = [
    {
      link: 'admin/map-mark-setting',
      icon: 'pin-outline',
      label: 'Set Map markers',
    },
  ];
}
