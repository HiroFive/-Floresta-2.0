import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from '../common/interfaces';
import { rootApiPath } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public getCartByUserId(userId: string): Observable<ICart> {
    return this.http.get<ICart>(
      `http://localhost:3001/api${rootApiPath.Cart}?userId=${userId}`,
    );
  }
}
