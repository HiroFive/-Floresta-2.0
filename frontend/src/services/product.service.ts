import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
    );
  }

  public getAllProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}${ApiSidePathEnum.All}`,
    );
  }

  public createProduct(body: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}`,
      body,
    );
  }

  public updateProductVisibility(
    id: number,
    newVisibility: boolean,
  ): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      JSON.stringify({ data: { hidden: newVisibility } }),
    );
  }

  public updateProductById(id: number, body: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
      body,
    );
  }

  public deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Products}/${id}`,
    );
  }
}
