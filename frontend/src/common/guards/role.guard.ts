import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthWrapperService } from '../../services/auth-wrapper.service';
import { LocalStorageService } from '../../services';
import { USER_PROFILE } from '../local-storage-keys';
import { UserRoles } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authWrapperService: AuthWrapperService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const userRole = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || {},
    )?.role;

    if (userRole !== UserRoles.Admin) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
