import { createAction, props } from '@ngrx/store';
import { User } from './login.state';

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const getUserRequest = createAction('[Auth] Get User Request');
export const logout = createAction('[Auth] Logout');
