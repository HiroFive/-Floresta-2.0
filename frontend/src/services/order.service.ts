import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AUTH_TOKEN, USER_PROFILE } from '../common/local-storage-keys';
import { IOrderDetails, IOrderDto } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getOrderDetails(orderNumber: number): Observable<IOrderDetails> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<IOrderDetails>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}?orderNumber=${orderNumber}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public getAllOrders(): Observable<Array<IOrderDetails>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<Array<IOrderDetails>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.All}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public getUserOrders(): Observable<Array<IOrderDetails>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    const userId = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || '{}',
    )?.id;

    return this.http.get<Array<IOrderDetails>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.GetOrderHistory}?userId=${userId}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public createOrder(orderDto: IOrderDto): Observable<any> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    const userId = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || '{}',
    )?.id;
    const bodyWithUserId = { ...orderDto, userId };

    return this.http.post<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}`,
      bodyWithUserId,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateOrderStatus(id: number, newStatus: string): Observable<any> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}/${id}`,
      { status: newStatus },
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateOrderItem(id: number, quantity: number): Observable<any> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.UpdateOrderItem}/${id}`,
      { quantity: quantity },
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public createOrderItem(orderItem: any): Observable<any> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.post<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.AddNewOrderItem}`,
      orderItem,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public deleteOrderItem(id: number): Observable<any> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<any>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.DeleteOrderItem}/${id}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }
}
