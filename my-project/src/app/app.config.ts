import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

import { LocalStorageService } from './services/local-storage.service';
//LocalStorageService, added

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    LocalStorageService,
    provideRouter(routes, withComponentInputBinding())
  ]
};
