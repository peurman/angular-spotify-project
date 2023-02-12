import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistState } from './artist.state';

const selectArtistState = createFeatureSelector<ArtistState>('artist');

export const selectArtistData = createSelector(
  selectArtistState,
  (state: ArtistState) => state.artist
);

export const selectIsLoading = createSelector(
  selectArtistState,
  (state: ArtistState) => state.isLoading
);

export const selectIsError = createSelector(
  selectArtistState,
  (state: ArtistState) => state.isError
);
