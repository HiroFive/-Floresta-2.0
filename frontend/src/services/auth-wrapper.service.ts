import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthWrapperService {
  isAuthenticated$: Observable<boolean>;

  constructor(public auth: AuthService) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }

  logIn() {
    this.auth.loginWithRedirect();
  }

  logOut(): void {
    this.auth.logout({ openUrl: false });
  }

  get authService(): AuthService {
    return this.auth;
  }
}
