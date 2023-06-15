import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICartItem } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from '../common/local-storage-keys';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public createCartItem(
    productId: number,
    cartId: number,
    data: ICartItem,
  ): Observable<ICartItem> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.post<ICartItem>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${ApiSidePathEnum.CreateCartItem}?cartId=${cartId}&productId=${productId}`,
      data,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateCartItem(id: number, data: ICartItem): Observable<ICartItem> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<ICartItem>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${ApiSidePathEnum.UpdateCartItem}?id=${id}`,
      data,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public deleteCartItem(ids: Array<number>): Observable<void> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${
        ApiSidePathEnum.DeleteCartItem
      }?id=${ids.join('&id=')}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }
}
