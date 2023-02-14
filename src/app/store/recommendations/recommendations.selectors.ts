import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecommendationsState } from './recommendations.state';

const selectRecommendationsState =
  createFeatureSelector<RecommendationsState>('recommendations');

export const selectRecommendationsData = createSelector(
  selectRecommendationsState,
  (state: RecommendationsState) => state.recommendationsData
);

export const selectIsLoading = createSelector(
  selectRecommendationsState,
  (state: RecommendationsState) => state.isLoading
);

export const selectIsError = createSelector(
  selectRecommendationsState,
  (state: RecommendationsState) => state.isError
);
