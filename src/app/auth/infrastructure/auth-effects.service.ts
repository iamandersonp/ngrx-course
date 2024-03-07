import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../domain/auth-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthEffectsService {
  private actions$: Actions = inject(Actions);
  private router: Router = inject(Router);
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginAction),
        tap((actions) =>
          localStorage.setItem('user', JSON.stringify(actions.user))
        )
      );
    },
    { dispatch: false }
  );
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutAction),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      );
    },
    { dispatch: false }
  );
}
