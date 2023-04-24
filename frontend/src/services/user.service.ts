import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../common/interfaces';
import { rootApiPath } from '../common/enums';
import { finalize } from 'rxjs/operators';
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
      `http://localhost:3001/api${rootApiPath.User}/${id}`,
    );
  }

  public createUser(body: any): Observable<IUser> {
    return this.http.post<IUser>(
      `http://localhost:3001/api${rootApiPath.User}`,
      body,
    );
  }
  public updateUser(id: string, body: FormData, callback?: () => void): void {
    this.http
      .patch<IUser>(`${rootApiPath.User}/${id}`, body)
      .pipe(
        finalize(() => {
          callback!();
        }),
      )
      .subscribe();
  }

  public deleteFoodById(id: string) {
    this.http.delete<string>(`${rootApiPath.User}/${id}`).subscribe();
  }
}
