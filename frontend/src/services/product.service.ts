import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AUTH_TOKEN } from '../common/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getProductById(id: number): Observable<IProduct> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public getAllProducts(): Observable<Array<IProduct>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<Array<IProduct>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}${ApiSidePathEnum.All}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public createProduct(body: FormData): Observable<IProduct> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.post<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}`,
      body,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateProductVisibility(
    id: number,
    newVisibility: boolean,
  ): Observable<IProduct> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      JSON.stringify({ data: { hidden: newVisibility } }),
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateProductById(id: number, body: IProduct): Observable<IProduct> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      body,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public deleteProductById(id: number): Observable<void> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }
}
