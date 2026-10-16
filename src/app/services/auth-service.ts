import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginResponse, UserInfo } from '../models/login-response';
import { catchError, Observable, of, tap } from 'rxjs';
import { constructURL } from '../utils/Utils';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { CONSTANTS } from '../constants/constants';
import { CurrentUserService } from './current-user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = signal<UserInfo | null>(null);
  private authenticated = signal(false);
  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
  ) {
    this.authenticated.set(localStorage.getItem(CONSTANTS.AUTH_KEY) === CONSTANTS.AUTH_STATE_TRUE);
  }
  loadUser() {
    return this.http
      .get<UserInfo>(constructURL(API_ENDPOINTS.AUTH.ME), {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          this.currentUserService.setUser(user);
          this.setAuthenticated(true);
        }),
        catchError(() => {
          this.user.set(null);
          this.setAuthenticated(false);
          return of(null);
        }),
      );
  }

  refresh(): Observable<void> {
    return this.http.get<void>(constructURL(API_ENDPOINTS.AUTH.REFRESH), { withCredentials: true });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        constructURL(API_ENDPOINTS.AUTH.LOGIN),
        { email, password },
        { withCredentials: true },
      )
      .pipe(tap(() => this.setAuthenticated(true)));
  }

  register(email: string, password: string): boolean {
    return true;
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(constructURL(API_ENDPOINTS.AUTH.LOGOUT), {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.setAuthenticated(false);
          this.currentUserService.clearUser();
        }),
      );
  }

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  private setAuthenticated(state: boolean): void {
    localStorage.setItem(
      CONSTANTS.AUTH_KEY,
      state ? CONSTANTS.AUTH_STATE_TRUE : CONSTANTS.AUTH_STATE_FALSE,
    );
    this.authenticated.set(state);
  }
  handleRefreshFailure(): void {
    this.user.set(null);
    this.setAuthenticated(false);
    this.currentUserService.clearUser();
  }
}
