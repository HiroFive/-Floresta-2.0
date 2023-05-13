import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthWrapperService } from '../../services/auth-wrapper.service';
import { RouterPathEnum } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class IdGuard implements CanActivate {
  constructor(
    private readonly authWrapperService: AuthWrapperService,
    private readonly router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!next.queryParams?.['id']) {
      this.router.navigate([RouterPathEnum.Home]);
      return false;
    }
    return true;
  }
}
