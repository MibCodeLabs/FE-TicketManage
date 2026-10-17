
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../../features/auth/services/auth-service';


let isRefreshing = false;
const refreshSubject = new BehaviorSubject<boolean | null>(null);

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const request = req.clone({ withCredentials: true });

  // Never intercept the refresh request itself.
  if (req.url.includes('/refresh')) {
    return next(request);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshSubject.pipe(
          filter((result): result is boolean => result !== null),
          take(1),
          switchMap((success) => {
            if (!success) {
              return throwError(() => error);
            }

            return next(request);
          }),
        );
      }

      isRefreshing = true;
      refreshSubject.next(null);

      return auth.refresh().pipe(
        switchMap(() => {
          refreshSubject.next(true);
          return next(request);
        }),
        catchError((refreshError) => {
          refreshSubject.next(false);

          auth.handleRefreshFailure();

          return throwError(() => refreshError);
        }),
        finalize(() => {
          isRefreshing = false;
        }),
      );
    }),
  );
};
