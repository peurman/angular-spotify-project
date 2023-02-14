import { createReducer, on, Action } from '@ngrx/store';
import * as albumActions from './album.actions';
import { AlbumDetailState } from './album.state';

export const initialAlbumState: AlbumDetailState = {
  albumData: null,
  isLoading: false,
  isError: null,
};

const albumReducerInternal = createReducer(
  initialAlbumState,
  on(albumActions.getAlbumDetailAction, (state): AlbumDetailState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    albumActions.getAlbumDetailSuccessAction,
    (state, { data }): AlbumDetailState => {
      return {
        ...state,
        albumData: data,
        isLoading: false,
      };
    }
  ),
  on(
    albumActions.getAlbumDetailErrorAction,
    (state, { message }): AlbumDetailState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function albumReducer(
  state: AlbumDetailState | undefined,
  action: Action
) {
  return albumReducerInternal(state, action);
}
