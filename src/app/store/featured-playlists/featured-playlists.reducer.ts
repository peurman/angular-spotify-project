import { createReducer, on, Action } from '@ngrx/store';
import * as featuredPlaylistsActions from './featured-playlists.actions';
import { FeaturedPlaylistsState } from './featured-playlists.state';

export const initialNewReleasesState: FeaturedPlaylistsState = {
  featuredPlaylistsData: null,
  isLoading: false,
  isError: null,
};

const featuredPlaylistsReducerInternal = createReducer(
  initialNewReleasesState,
  on(featuredPlaylistsActions.getFeaturedPlaylistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    featuredPlaylistsActions.getFeaturedPlaylistsSuccessAction,
    (state, { data }) => {
      return {
        ...state,
        featuredPlaylistsData: data,
        isLoading: false,
      };
    }
  ),
  on(
    featuredPlaylistsActions.getFeaturedPlaylistsErrorAction,
    (state, { message }) => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function featuredPlaylistsReducer(
  state: FeaturedPlaylistsState | undefined,
  action: Action
) {
  return featuredPlaylistsReducerInternal(state, action);
}
