import { createReducer, on, Action } from '@ngrx/store';
import * as albumDetailActions from './album.actions';
import { AlbumDetailState } from './album.state';

export const initialCategoryState: AlbumDetailState = {
  albumDetailData: null,
  isLoading: false,
  isError: null,
};

const albumDetailReducerInternal = createReducer(
  initialCategoryState,
  on(albumDetailActions.getAlbumDetailAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(albumDetailActions.getAlbumDetailSuccessAction, (state, { data }) => {
    return {
      ...state,
      albumDetailData: data,
      isLoading: false,
    };
  }),
  on(albumDetailActions.getAlbumDetailErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);
export function albumDetailReducer(
  state: AlbumDetailState | undefined,
  action: Action
) {
  return albumDetailReducerInternal(state, action);
}
