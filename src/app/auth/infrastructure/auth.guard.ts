import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthSelectors } from '../domain/auth-types';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const store = inject(Store);
  return store.select(AuthSelectors.selectIsLoggedIn).pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
