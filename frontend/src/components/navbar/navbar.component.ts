import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navigationMenuItems = [
    {
      label: 'Посадити дерева',
    },
    {
      label: 'Доступні міста',
    },
    {
      label: 'Приєднатись до команди',
    },
    {
      label: 'FAQ',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
