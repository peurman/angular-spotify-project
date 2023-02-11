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
  on(newReleasesActions.getNewReleasesAction, (state): NewReleasesState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    newReleasesActions.getNewReleasesSuccessAction,
    (state, { data }): NewReleasesState => {
      return {
        ...state,
        newReleasesData: data,
        isLoading: false,
      };
    }
  ),
  on(
    newReleasesActions.getNewReleasesErrorAction,
    (state, { message }): NewReleasesState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function newReleasesReducer(
  state: NewReleasesState | undefined,
  action: Action
) {
  return newReleasesReducerInternal(state, action);
}
