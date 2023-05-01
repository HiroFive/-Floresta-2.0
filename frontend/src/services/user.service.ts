import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserRoles } from '../common/interfaces';
import { rootApiPath } from '../common/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public userTokenToProps(token: any): IUser {
    return {
      name: token.nickname,
      email: token.email,
      subId: token?.['sub'],
    };
  }

  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.User}/${id}`,
    );
  }

  public getAllUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.User}/all`,
    );
  }

  public getUserRoles(): Observable<Array<IUserRoles>> {
    return this.http.get<Array<IUserRoles>>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.Role}/all`,
    );
  }

  public createUser(body: any): Observable<IUser> {
    return this.http.post<IUser>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.User}`,
      body,
    );
  }

  public updateUser(id: string, body: IUser): Observable<IUser> {
    return this.http.patch<IUser>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.User}/${id}`,
      body,
    );
  }

  public deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3001${rootApiPath.Api}${rootApiPath.User}/${id}`,
    );
  }
}
