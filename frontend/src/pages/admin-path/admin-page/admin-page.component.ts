import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services';
import { RouterPathEnum } from '../../../common/enums';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  modalState: { content: any; open: boolean; injector: any };
  innerWidth: number;

  constructor(
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {
    if (router.url === '/admin') {
      this.router.navigate(['admin', 'map-marks']);
    }
  }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.modalService.modalSource.subscribe(
      (value: any) => (this.modalState = value),
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  get isGuardVisible(): boolean {
    return this.innerWidth <= 680;
  }

  backToHomePage(): void {
    this.router.navigate([RouterPathEnum.Home]);
  }
}
