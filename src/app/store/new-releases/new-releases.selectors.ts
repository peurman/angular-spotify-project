import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NewReleasesState } from './new-releases.state';

const selectNewReleasesState =
  createFeatureSelector<NewReleasesState>('newReleases');

export const selectNewReleasesData = createSelector(
  selectNewReleasesState,
  (state: NewReleasesState) => state.newReleasesData
);

export const selectIsLoading = createSelector(
  selectNewReleasesState,
  (state: NewReleasesState) => state.isLoading
);

export const selectIsError = createSelector(
  selectNewReleasesState,
  (state: NewReleasesState) => state.isError
);
