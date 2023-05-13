import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthWrapperService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { RouterPathEnum } from '../../common/enums';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  constructor(
    public authWrapperService: AuthWrapperService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.authWrapperService.isAuthenticated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.authWrapperService.logOut();
        }
        this.router.navigate([RouterPathEnum.Home]);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
