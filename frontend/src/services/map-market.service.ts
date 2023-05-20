import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMapMarker, IMapMarkerWithProductInfo } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from '../common/local-storage-keys';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MapMarketService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getMapMarkerByRoleId(roleId: number): Observable<Array<IMapMarker>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<Array<IMapMarker>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}?roleId=${roleId}`,
      {
        headers: {
          token,
        },
      },
    );
  }

  public getMarkerProducts(id: number): Observable<IMapMarkerWithProductInfo> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<IMapMarkerWithProductInfo>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}${ApiSidePathEnum.GetProducts}?id=${id}`,
      {
        headers: {
          token,
        },
      },
    );
  }

  public createMapMarker(body: IMapMarker): Observable<IMapMarker> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.post<IMapMarker>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}`,
      body,
      {
        headers: {
          token,
        },
      },
    );
  }

  public updateMapMarker(id: number, body: IMapMarker): Observable<IMapMarker> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IMapMarker>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}/${id}`,
      body,
      {
        headers: {
          token,
        },
      },
    );
  }

  public updateMapMarkerVisibility(
    id: number,
    newVisibility: boolean,
  ): Observable<IMapMarker> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IMapMarker>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}/${id}`,
      { hidden: newVisibility },
      {
        headers: {
          token,
        },
      },
    );
  }

  public deleteMapMarkerById(id: number): Observable<void> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}/${id}`,
      {
        headers: {
          token,
        },
      },
    );
  }
}
