import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const selectIsLoggedOut = createSelector(
  selectIsLoggedIn,
  (isLoggedIn) => !isLoggedIn
);
