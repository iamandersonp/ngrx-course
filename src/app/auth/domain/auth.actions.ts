import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

export const loginAction = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const logoutAction = createAction('[Top Menu] User Logout');
