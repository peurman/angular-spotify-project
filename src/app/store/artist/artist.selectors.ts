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

export const selectAlbumsData = createSelector(
  selectArtistState,
  (state: ArtistState) => state.artistAlbums
);

export const selectTracks = createSelector(
  selectArtistState,
  (state: ArtistState) => state.tracks
);

export const selectSuggestedArtists = createSelector(
  selectArtistState,
  (state: ArtistState) => state.relatedArtists
);
