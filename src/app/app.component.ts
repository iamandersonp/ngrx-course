import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { AuthActions, AuthSelectors } from './auth/domain/auth-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  logout() {}
}
