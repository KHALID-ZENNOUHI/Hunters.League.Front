import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(), withInterceptors([])), provideRouter(routes), provideClientHydration(), provideStore(), provideEffects()]
};
