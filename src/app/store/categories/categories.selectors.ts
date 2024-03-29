import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CategoriesState } from './categories.state';

const selectCategoryState =
  createFeatureSelector<CategoriesState>('categories');

export const selectCategoriesData = createSelector(
  selectCategoryState,
  (state: CategoriesState) => state.categoriesData
);

export const selectIsLoading = createSelector(
  selectCategoryState,
  (state: CategoriesState) => state.isLoading
);

export const selectIsError = createSelector(
  selectCategoryState,
  (state: CategoriesState) => state.isError
);

export const selectPlayLists = createSelector(
  selectCategoryState,
  (state: CategoriesState) => state.playlists
);

export const selectCategorySelected = createSelector(
  selectCategoryState,
  (state: CategoriesState) => state.categorySelected
);
