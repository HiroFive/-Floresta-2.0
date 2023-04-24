import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(`floresta-2.0-${key}`, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return localStorage.getItem(`floresta-2.0-${key}`);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
