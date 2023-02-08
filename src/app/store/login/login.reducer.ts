import { createReducer, on, Action } from '@ngrx/store';
import * as loginActions from './login.actions';
import { LoginState } from './login.state';

export const initialState: LoginState = {
  loggedIn: false,
};

export const loginReducerInternal = createReducer(
  initialState,
  on(loginActions.login, (state, { user }) => ({
    ...state,
    loggedIn: true,
    user,
  })),
  on(loginActions.logout, (state) => ({
    ...state,
    loggedIn: false,
    user: undefined,
  }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return loginReducerInternal(state, action);
}
