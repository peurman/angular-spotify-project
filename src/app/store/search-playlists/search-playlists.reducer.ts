import { createReducer, on, Action } from '@ngrx/store';
import * as searchPlaylistsActions from './search-playlists.actions';
import { SearchPlaylistsState } from './search-playlists.state';

export const initialSearchPlaylistsState: SearchPlaylistsState = {
  searchPlaylistsData: null,
  isLoading: false,
  isError: null,
};

const searchPlaylistsReducerInternal = createReducer(
  initialSearchPlaylistsState,
  on(searchPlaylistsActions.getSearchPlaylistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    searchPlaylistsActions.getSearchPlaylistsSuccessAction,
    (state, { data }) => {
      return {
        ...state,
        searchPlaylistsData: data,
        isLoading: false,
      };
    }
  ),
  on(
    searchPlaylistsActions.getSearchPlaylistsErrorAction,
    (state, { message }) => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function searchPlaylistsReducer(
  state: SearchPlaylistsState | undefined,
  action: Action
) {
  return searchPlaylistsReducerInternal(state, action);
}
