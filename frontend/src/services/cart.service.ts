import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../common/interfaces';
import { RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AUTH_TOKEN } from '../common/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getCartByUserId(userId: string): Observable<ICart> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<ICart>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}?userId=${userId}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public deleteCartByUserId(userId: string): Observable<void> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}/delete-by-userId/${userId}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }
}
