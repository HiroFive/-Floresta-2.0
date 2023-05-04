import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMapMarker } from '../common/interfaces';
import { RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapMarketService {
  constructor(private http: HttpClient) {}

  public getMapMarkerByRoleId(roleId: number): Observable<Array<IMapMarker>> {
    return this.http.get<Array<IMapMarker>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}?roleId=${roleId}`,
    );
  }

  public createMapMarker(body: IMapMarker): Observable<IMapMarker> {
    return this.http.post<IMapMarker>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}`,
      body,
    );
  }

  public updateMapMarkerVisibility(
    id: number,
    newVisibility: boolean,
  ): Observable<IMapMarker> {
    return this.http.patch<IMapMarker>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}/${id}`,
      { hidden: newVisibility },
    );
  }

  public deleteMapMarkerById(id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Marker}/${id}`,
    );
  }
}
