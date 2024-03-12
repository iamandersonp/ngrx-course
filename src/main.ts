import { enableProdMode, importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { EntityDataModule } from '@ngrx/data';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {
  StoreDevtoolsModule,
  provideStoreDevtools
} from '@ngrx/store-devtools';
import * as formRootRedurecer from './app/reducers';

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

import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import * as fromAuth from './app/auth/domain/reducers';
import { AuthEffectsService } from './app/auth/infrastructure/auth-effects.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ router: routerReducer }),
    provideRouterStore(),
    provideEffects([]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(
      BrowserModule,
      MatMenuModule,
      MatIconModule,
      MatSidenavModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatToolbarModule,
      StoreModule.forRoot(
        {
          ...formRootRedurecer.reducers,
          router: routerReducer
        },
        { metaReducers: formRootRedurecer.metaReducers }
      ),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot({}),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false
      }),
      StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
      EffectsModule.forFeature([AuthEffectsService])
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.log(err));
