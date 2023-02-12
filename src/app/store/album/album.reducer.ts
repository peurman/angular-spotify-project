import { createReducer, on, Action } from '@ngrx/store';
import * as albumDetailActions from './album.actions';
import { AlbumDetailState } from './album.state';

export const initialAlbumState: AlbumDetailState = {
  albumDetailData: null,
  isLoading: false,
  isError: null,
};

const albumDetailReducerInternal = createReducer(
  initialAlbumState,
  on(albumDetailActions.getAlbumDetailAction, (state): AlbumDetailState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    albumDetailActions.getAlbumDetailSuccessAction,
    (state, { data }): AlbumDetailState => {
      return {
        ...state,
        albumDetailData: data,
        isLoading: false,
      };
    }
  ),
  on(
    albumDetailActions.getAlbumDetailErrorAction,
    (state, { message }): AlbumDetailState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);
export function albumDetailReducer(
  state: AlbumDetailState | undefined,
  action: Action
) {
  return albumDetailReducerInternal(state, action);
}
