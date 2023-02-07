import { createReducer, on, Action } from '@ngrx/store';
import * as newReleasesActions from './new-releases.actions';
import { NewReleasesState } from './new-releases.state';

export const initialNewReleasesState: NewReleasesState = {
  newReleasesData: null,
  isLoading: false,
  isError: null,
};

const newReleasesReducerInternal = createReducer(
  initialNewReleasesState,
  on(newReleasesActions.getNewReleasesAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(newReleasesActions.getNewReleasesSuccessAction, (state, { data }) => {
    return {
      ...state,
      newReleasesData: data,
      isLoading: false,
    };
  }),
  on(newReleasesActions.getNewReleasesErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);
export function newReleasesReducer(
  state: NewReleasesState | undefined,
  action: Action
) {
  return newReleasesReducerInternal(state, action);
}
