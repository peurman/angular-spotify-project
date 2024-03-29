import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';
// import { RootState } from '..';

const selectLoginState = createFeatureSelector<LoginState>('loggedIn');

// export const selectLoginState = (state: RootState) => state.loggedIn;

export const selectProfileInfo = createSelector(
  selectLoginState,
  (state: LoginState) => state.user
);

export const selectLogin = createSelector(
  selectLoginState,
  (state: LoginState) => state.loggedIn
);
export const selectLoginUsername = createSelector(
  selectLoginState,
  (state: LoginState) => state.user?.display_name
);
