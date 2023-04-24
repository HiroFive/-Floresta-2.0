import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminComponentPage implements OnInit {
  constructor(private readonly router: Router) {
    this.router.navigate(['admin', 'map-mark-setting']);
  }
  ngOnInit(): void {
    console.log('admin-panel');
  }
}
