import { Injectable, signal } from '@angular/core';
import { UserInfo } from '../../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private _currentUser = signal<UserInfo | null>(null);

  currentUser = this._currentUser.asReadonly();

  setUser(user: UserInfo): void {
    this._currentUser.set(user);
  }

  clearUser(): void {
    this._currentUser.set(null);
  }
}
