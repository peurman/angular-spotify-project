import { createReducer, on, Action } from '@ngrx/store';
import * as searchArtistsActions from './search-artists.actions';
import { SearchArtistsState } from './search-artists.state';

export const initialSearchArtistsState: SearchArtistsState = {
  searchArtistsData: null,
  isLoading: false,
  isError: null,
};

const searchArtistsReducerInternal = createReducer(
  initialSearchArtistsState,
  on(searchArtistsActions.getSearchArtistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(searchArtistsActions.getSearchArtistsSuccessAction, (state, { data }) => {
    return {
      ...state,
      searchArtistsData: data,
      isLoading: false,
    };
  }),
  on(searchArtistsActions.getSearchArtistsErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);
export function searchArtistsReducer(
  state: SearchArtistsState | undefined,
  action: Action
) {
  return searchArtistsReducerInternal(state, action);
}
