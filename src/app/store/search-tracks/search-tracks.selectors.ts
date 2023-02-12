import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchTracksState } from './search-tracks.state';

const selectSearchTracksState =
  createFeatureSelector<SearchTracksState>('searchTracks');

export const selectSearchTracksData = createSelector(
  selectSearchTracksState,
  (state: SearchTracksState) => state.searchTracksData
);

export const selectIsLoading = createSelector(
  selectSearchTracksState,
  (state: SearchTracksState) => state.isLoading
);

export const selectIsError = createSelector(
  selectSearchTracksState,
  (state: SearchTracksState) => state.isError
);
