import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserRoles } from '../common/interfaces';
import { ApiSidePathEnum, RootApiPathEnum } from '../common/enums';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from '../common/local-storage-keys';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public userTokenToProps(token: any): IUser {
    return {
      name: token.nickname,
      email: token.email,
      subId: token?.['sub'],
    };
  }

  public getUserById(id: string): Observable<IUser> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<IUser>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.User}/${id}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public getAllUsers(): Observable<Array<IUser>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<Array<IUser>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.User}${ApiSidePathEnum.All}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public getUserRoles(): Observable<Array<IUserRoles>> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.get<Array<IUserRoles>>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.Role}${ApiSidePathEnum.All}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public createUser(body: any): Observable<IUser> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.post<IUser>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.User}`,
      body,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public updateUser(id: string, body: IUser): Observable<IUser> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.patch<IUser>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.User}/${id}`,
      body,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }

  public deleteUserById(id: string): Observable<void> {
    const token = this.localStorageService.getItem(AUTH_TOKEN);

    return this.http.delete<void>(
      `http://localhost:3001${RootApiPathEnum.Api}${RootApiPathEnum.User}/${id}`,
      {
        headers: {
          token: token || '',
        },
      },
    );
  }
}
