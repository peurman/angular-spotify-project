import { createReducer, on, Action } from '@ngrx/store';
import * as playlistActions from './playlist.actions';
import { PlaylistState } from './playlist.state';

export const initialPlaylistState: PlaylistState = {
  playlistData: null,
  isLoading: false,
  isError: null,
};

const playlistReducerInternal = createReducer(
  initialPlaylistState,
  on(playlistActions.getPlaylistAction, (state): PlaylistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    playlistActions.getPlaylistSuccessAction,
    (state, { data }): PlaylistState => {
      return {
        ...state,
        playlistData: data,
        isLoading: false,
      };
    }
  ),
  on(
    playlistActions.getPlaylistErrorAction,
    (state, { message }): PlaylistState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function playlistReducer(
  state: PlaylistState | undefined,
  action: Action
) {
  return playlistReducerInternal(state, action);
}
