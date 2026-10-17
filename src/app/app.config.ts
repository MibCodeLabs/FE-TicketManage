import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './features/auth/services/auth-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { refreshInterceptor } from './core/interceptors/refresh-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => firstValueFrom(inject(AuthService).loadUser())),
    provideHttpClient(withInterceptors([loadingInterceptor,refreshInterceptor])),
  ],
};
