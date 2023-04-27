import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMapMarker } from '../common/interfaces';
import { rootApiPath } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapMarketService {
  constructor(private http: HttpClient) {}

  public getMapMarkerByRoleId(roleId: number): Observable<Array<IMapMarker>> {
    return this.http.get<Array<IMapMarker>>(
      `http://localhost:3001/api${rootApiPath.Marker}?roleId=${roleId}`,
    );
  }

  public createMapMarker(body: any): Observable<IMapMarker> {
    return this.http.post<IMapMarker>(
      `http://localhost:3001/api${rootApiPath.Marker}`,
      body,
    );
  }
}
