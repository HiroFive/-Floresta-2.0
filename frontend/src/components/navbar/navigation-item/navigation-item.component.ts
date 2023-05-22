import { Component, Input, OnInit } from '@angular/core';
import { INavigationItem } from '../../../common/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent implements OnInit {
  @Input() data: INavigationItem;

  constructor(readonly router: Router) {}
  ngOnInit() {}
}
