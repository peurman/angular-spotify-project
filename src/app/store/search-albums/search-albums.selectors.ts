import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchAlbumsState } from './search-albums.state';

const selectSearchAlbumsState =
  createFeatureSelector<SearchAlbumsState>('searchAlbums');

export const selectSearchAlbumsData = createSelector(
  selectSearchAlbumsState,
  (state: SearchAlbumsState) => state.searchAlbumsData
);

export const selectIsLoading = createSelector(
  selectSearchAlbumsState,
  (state: SearchAlbumsState) => state.isLoading
);

export const selectIsError = createSelector(
  selectSearchAlbumsState,
  (state: SearchAlbumsState) => state.isError
);
