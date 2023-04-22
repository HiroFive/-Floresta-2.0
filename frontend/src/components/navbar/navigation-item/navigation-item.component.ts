import { Component, Input } from '@angular/core';
import { INavigationItem } from '../../../common/interfaces';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() data: INavigationItem;

  constructor() {}
}
