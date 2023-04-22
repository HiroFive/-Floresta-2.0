import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthWrapperService } from '../../services/auth-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authWrapperService: AuthWrapperService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authWrapperService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
