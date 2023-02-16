import { createReducer, on, Action } from '@ngrx/store';
import * as albumActions from './album.actions';
import { AlbumDetailState } from './album.state';
import * as trackActions from '../track/track.actions';
import { AlbumDetail, Tracks } from 'src/app/albums/models/albums.interface';

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
  ),
  on(
    trackActions.SaveRemoveTrackSuccessAction,
    (state, { id }): AlbumDetailState => {
      const itemsUpdated = state.albumData?.tracks?.items.map((track) => {
        const trackFixed = { ...track };
        if (track.id == id) {
          trackFixed.saved = !track.saved;
        }
        return trackFixed;
      });
      const data = { ...state.albumData } as AlbumDetail;
      if (itemsUpdated) {
        const tracks = { ...state.albumData?.tracks } as Tracks;
        tracks.items = itemsUpdated;
        data.tracks = tracks;
      }

      return {
        ...state,
        albumData: data,
        isLoading: false,
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
