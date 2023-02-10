import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AlbumDetailState } from './album.state';

const selectCategoryState =
  createFeatureSelector<AlbumDetailState>('albumDetail');

export const selectAlbumDetailData = createSelector(
  selectCategoryState,
  (state: AlbumDetailState) => state.albumDetailData
);

export const selectIsLoading = createSelector(
  selectCategoryState,
  (state: AlbumDetailState) => state.isLoading
);

export const selectIsError = createSelector(
  selectCategoryState,
  (state: AlbumDetailState) => state.isError
);
