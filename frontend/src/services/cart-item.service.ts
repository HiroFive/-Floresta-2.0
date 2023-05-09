import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICartItem } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}

  public createCartItem(
    productId: number,
    cartId: number,
    data: ICartItem,
  ): Observable<ICartItem> {
    return this.http.post<ICartItem>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${ApiSidePathEnum.CreateCartItem}?cartId=${cartId}&productId=${productId}`,
      data,
    );
  }

  public updateCartItem(id: number, data: ICartItem): Observable<ICartItem> {
    return this.http.patch<ICartItem>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${ApiSidePathEnum.UpdateCartItem}?id=${id}`,
      data,
    );
  }

  public deleteCartItem(ids: Array<number>): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Cart}${
        ApiSidePathEnum.DeleteCartItem
      }?id=${ids.join('&id=')}`,
    );
  }
}
