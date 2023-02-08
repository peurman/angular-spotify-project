import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';
// import { RootState } from '..';

const selectLoginState = createFeatureSelector<LoginState>('loggedIn');

// export const selectLoginState = (state: RootState) => state.loggedIn;

export const selectLogin = createSelector(
  selectLoginState,
  (state: LoginState) => state.loggedIn
);
