import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchArtistsState } from './search-artists.state';

const selectSearchArtistsState =
  createFeatureSelector<SearchArtistsState>('searchArtists');

export const selectSearchArtistsData = createSelector(
  selectSearchArtistsState,
  (state: SearchArtistsState) => state.searchArtistsData
);

export const selectIsLoading = createSelector(
  selectSearchArtistsState,
  (state: SearchArtistsState) => state.isLoading
);

export const selectIsError = createSelector(
  selectSearchArtistsState,
  (state: SearchArtistsState) => state.isError
);
