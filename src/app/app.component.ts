import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AuthActions, AuthSelectors } from './auth/domain/auth-types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterLink,
    MatIconModule,
    NgIf,
    MatToolbarModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    AsyncPipe
  ]
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean> = this.store.select(
    AuthSelectors.selectIsLoggedIn
  );
  isLoggedOut$: Observable<boolean> = this.store.select(
    AuthSelectors.selectIsLoggedOut
  );

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.store.dispatch(AuthActions.loginAction({ user: JSON.parse(user) }));
    }
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logoutAction());
  }
}
