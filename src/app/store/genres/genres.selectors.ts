import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenresState } from './genres.state';

const selectGenresState = createFeatureSelector<GenresState>('genres');

export const selectGenresData = createSelector(
  selectGenresState,
  (state: GenresState) => state.genresData
);

export const selectIsLoading = createSelector(
  selectGenresState,
  (state: GenresState) => state.isLoading
);

export const selectIsError = createSelector(
  selectGenresState,
  (state: GenresState) => state.isError
);
