import { createReducer, on, Action } from '@ngrx/store';
import {
  Item,
  Playlist,
  Tracks,
} from 'src/app/playlists/models/playlists.interface';
import * as playlistActions from './playlist.actions';
import { PlaylistState } from './playlist.state';
import * as trackActions from '../track/track.actions';
import { Track } from 'src/app/search/models/search.interface';

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
    playlistActions.updatePlaylistsTracks,
    (state, { data }): PlaylistState => {
      const playlistDataUpdated = { ...state.playlistData } as Playlist;
      playlistDataUpdated.tracks = data;
      return {
        ...state,
        playlistData: playlistDataUpdated,
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
  ),
  on(
    trackActions.SaveRemoveTrackSuccessAction,
    (state, { id }): PlaylistState => {
      const itemsUpdated = state.playlistData?.tracks.items?.map((track) => {
        const trackFixed = { ...track };
        console.log(trackFixed);
        if (track.track.id == id) {
          trackFixed.track.saved = !track.track.saved;
        }
        return trackFixed;
      }) as Item[];
      const data = { ...state.playlistData } as Playlist;
      if (itemsUpdated) {
        const tracks = { ...state.playlistData?.tracks } as Tracks;
        tracks.items = itemsUpdated;
        data.tracks = tracks;
      }

      return {
        ...state,
        playlistData: data,
        isLoading: false,
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
