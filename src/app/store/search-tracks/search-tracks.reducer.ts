import { createReducer, on, Action } from '@ngrx/store';
import * as searchTracksActions from './search-tracks.actions';
import { SearchTracksState } from './search-tracks.state';

export const initialSearchTracksState: SearchTracksState = {
  searchTracksData: null,
  isLoading: false,
  isError: null,
};

const searchTracksReducerInternal = createReducer(
  initialSearchTracksState,
  on(searchTracksActions.getSearchTracksAction, (state): SearchTracksState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    searchTracksActions.getSearchTracksSuccessAction,
    (state, { data }): SearchTracksState => {
      return {
        ...state,
        searchTracksData: data,
        isLoading: false,
      };
    }
  ),
  on(
    searchTracksActions.getSearchTracksErrorAction,
    (state, { message }): SearchTracksState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function searchTracksReducer(
  state: SearchTracksState | undefined,
  action: Action
) {
  return searchTracksReducerInternal(state, action);
}
