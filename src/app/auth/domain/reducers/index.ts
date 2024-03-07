import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../auth-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: undefined
};

export const authReducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(AuthActions.loginAction, (state, action): AuthState => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.logoutAction, (state): AuthState => {
    return {
      user: undefined
    };
  })
);
