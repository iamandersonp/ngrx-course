import { EntityDataModule, provideEntityData } from '@ngrx/data';
import {
  StoreRouterConnectingModule,
  provideRouterStore,
  RouterState
} from '@ngrx/router-store';
import {
  StoreDevtoolsModule,
  provideStoreDevtools
} from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { AuthEffectsService } from './auth/infrastructure/auth-effects.service';
import * as formRootRedurecer from './reducers';
import * as fromAuth from './auth/domain/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Experimental Initial implementation of the Standalone Api for the Store
    provideStore(formRootRedurecer.reducers, {
      metaReducers: formRootRedurecer.metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true
      }
    }),
    provideRouterStore({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    provideEffects([]),
    provideEntityData({}),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(
      BrowserModule,
      MatMenuModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatToolbarModule,
      StoreModule.forRoot(formRootRedurecer.reducers, {
        metaReducers: formRootRedurecer.metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true
        }
      }),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot({}),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false
      }),
      StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
      EffectsModule.forFeature([AuthEffectsService]),
      StoreRouterConnectingModule.forRoot({
        stateKey: 'router',
        routerState: RouterState.Minimal
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
