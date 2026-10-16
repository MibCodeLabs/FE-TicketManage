import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth-service';
import { refreshInterceptor } from './interceptors/refresh-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => firstValueFrom(inject(AuthService).loadUser())),
    provideHttpClient(withInterceptors([loadingInterceptor,refreshInterceptor])),
  ],
};
