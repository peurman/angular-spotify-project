import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeaturedPlaylistsState } from './featured-playlists.state';

const selectFeaturedPlaylistsState =
  createFeatureSelector<FeaturedPlaylistsState>('featuredPlaylists');

export const selectNewReleasesData = createSelector(
  selectFeaturedPlaylistsState,
  (state: FeaturedPlaylistsState) => state.featuredPlaylistsData
);

export const selectIsLoading = createSelector(
  selectFeaturedPlaylistsState,
  (state: FeaturedPlaylistsState) => state.isLoading
);

export const selectIsError = createSelector(
  selectFeaturedPlaylistsState,
  (state: FeaturedPlaylistsState) => state.isError
);
