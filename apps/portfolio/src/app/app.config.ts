import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  visitorRatingFeatureKey,
  visitorRatingReducer,
} from './visitor-state/visitor-rating.reducer';
import { VisitorRatingEffects } from './visitor-state/visitor-rating.effects';
import { VisitorRatingBootstrap } from './visitor-state/visitor-rating-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideStore({
      [visitorRatingFeatureKey]: visitorRatingReducer,
    }),
    provideEffects(VisitorRatingEffects),
    provideAppInitializer(() => inject(VisitorRatingBootstrap).initialize()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled' }),
    ),
  ],
};
