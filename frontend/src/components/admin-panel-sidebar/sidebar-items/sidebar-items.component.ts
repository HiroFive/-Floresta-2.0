import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-items',
  templateUrl: './sidebar-items.component.html',
  styleUrls: ['./sidebar-items.component.scss'],
})
export class SidebarItemsComponent {
  @Input() icon: string;
  @Input() label: string;
  @Input() link: string;

  constructor(private readonly router: Router) {}

  redirectLinkClick(): void {
    this.router.navigate(['admin', this.link]);
  }
}
