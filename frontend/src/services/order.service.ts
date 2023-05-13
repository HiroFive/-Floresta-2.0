import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_PROFILE } from '../common/local-storage-keys';
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
    return this.http.get<IOrderDetails>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}?orderNumber=${orderNumber}`,
    );
  }

  public getAllOrders(): Observable<Array<IOrderDetails>> {
    return this.http.get<Array<IOrderDetails>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.All}`,
    );
  }

  public createOrder(orderDto: IOrderDto): Observable<any> {
    const userId = JSON.parse(
      this.localStorageService.getItem(USER_PROFILE) || '{}',
    )?.id;
    const bodyWithUserId = { ...orderDto, userId };

    return this.http.post<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}`,
      bodyWithUserId,
    );
  }

  public updateOrderStatus(id: number, newStatus: string): Observable<any> {
    return this.http.patch<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}/${id}`,
      { status: newStatus },
    );
  }

  public updateOrderItem(id: number, quantity: number): Observable<any> {
    return this.http.patch<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.UpdateOrderItem}/${id}`,
      { quantity: quantity },
    );
  }

  public createOrderItem(orderItem: any): Observable<any> {
    return this.http.post<IOrderDto>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.AddNewOrderItem}`,
      orderItem,
    );
  }

  public deleteOrderItem(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Order}${ApiSidePathEnum.DeleteOrderItem}/${id}`,
    );
  }
}
