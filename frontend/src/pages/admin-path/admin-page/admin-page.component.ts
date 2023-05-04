import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  modalState: { content: any; open: boolean; injector: any };
  constructor(
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {
    if (router.url === '/admin') {
      this.router.navigate(['admin', 'map-marks']);
    }
  }
  ngOnInit(): void {
    this.modalService.modalSource.subscribe(
      (value: any) => (this.modalState = value),
    );
  }
}
