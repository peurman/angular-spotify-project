import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MyMusicState } from './my-music.state';

const selectPlaylistState = createFeatureSelector<MyMusicState>('myMusic');

export const selectMyPlaylistsData = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.playlists.data
);

export const selectMyPlaylistsIsLoading = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.playlists.isLoading
);

export const selectMyPlaylistsIsError = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.playlists.isError
);
export const selectMyArtistsData = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.artists.data
);

export const selectMyArtistsIsLoading = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.artists.isLoading
);

export const selectMyArtistsIsError = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.artists.isError
);
export const selectMyAlbumsData = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.albums.data
);

export const selectMyAlbumsIsLoading = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.albums.isLoading
);

export const selectMyAlbumsIsError = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.albums.isError
);
export const selectMyTracksData = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.tracks.data
);

export const selectMyTracksIsLoading = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.tracks.isLoading
);

export const selectMyTracksIsError = createSelector(
  selectPlaylistState,
  (state: MyMusicState) => state.tracks.isError
);
