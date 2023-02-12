import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchPlaylistsState } from './search-playlists.state';

const selectSearchPlaylistsState =
  createFeatureSelector<SearchPlaylistsState>('searchPlaylists');

export const selectSearchPlaylistsData = createSelector(
  selectSearchPlaylistsState,
  (state: SearchPlaylistsState) => state.searchPlaylistsData
);

export const selectIsLoading = createSelector(
  selectSearchPlaylistsState,
  (state: SearchPlaylistsState) => state.isLoading
);

export const selectIsError = createSelector(
  selectSearchPlaylistsState,
  (state: SearchPlaylistsState) => state.isError
);
