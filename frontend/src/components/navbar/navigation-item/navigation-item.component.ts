import { Component, Input, OnInit } from '@angular/core';
import { INavigationItem } from '../../../common/interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent implements OnInit {
  @Input() data: INavigationItem;

  constructor(private readonly router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((ev: any) => {
      if (!(ev instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
