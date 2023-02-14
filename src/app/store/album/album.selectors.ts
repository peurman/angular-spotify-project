import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AlbumDetailState } from './album.state';

const selectAlbumState = createFeatureSelector<AlbumDetailState>('album');

export const selectAlbumDetailData = createSelector(
  selectAlbumState,
  (state: AlbumDetailState) => state.albumData
);

export const selectIsLoading = createSelector(
  selectAlbumState,
  (state: AlbumDetailState) => state.isLoading
);

export const selectIsError = createSelector(
  selectAlbumState,
  (state: AlbumDetailState) => state.isError
);
