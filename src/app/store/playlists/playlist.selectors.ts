import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlaylistState } from './playlist.state';

const selectPlaylistState = createFeatureSelector<PlaylistState>('playlist');

export const selectPlaylistData = createSelector(
  selectPlaylistState,
  (state: PlaylistState) => state.playlistData
);

export const selectIsLoading = createSelector(
  selectPlaylistState,
  (state: PlaylistState) => state.isLoading
);

export const selectIsError = createSelector(
  selectPlaylistState,
  (state: PlaylistState) => state.isError
);
