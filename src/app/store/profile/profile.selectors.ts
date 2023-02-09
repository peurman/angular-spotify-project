import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectTopArtists = createSelector(
  selectProfileState,
  (state: ProfileState) => state.topArtists
);

export const selectTopTracks = createSelector(
  selectProfileState,
  (state: ProfileState) => state.topTracks
);

export const selectIsLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.isLoading
);

export const selectIsError = createSelector(
  selectProfileState,
  (state: ProfileState) => state.isError
);
