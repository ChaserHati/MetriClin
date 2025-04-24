import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { TokenInterceptor } from './services/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(
    withInterceptorsFromDi()
  ),
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
};
