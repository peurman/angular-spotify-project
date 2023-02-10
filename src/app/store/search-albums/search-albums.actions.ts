import { createAction, props } from '@ngrx/store';
import { Albums } from 'src/app/search/models/search.interface';

export const getSearchAlbumsAction = createAction(
  '[SearchAlbums] Get Search Albums Action',
  props<{ url: string | null; searchedTerm: string }>()
);
export const getSearchAlbumsSuccessAction = createAction(
  '[SearchAlbums] Get Search Albums Success Action',
  props<{ data: Albums }>()
);
export const getSearchAlbumsErrorAction = createAction(
  '[SearchAlbums] Get Search AlbumsError Action',
  props<{ message: string }>()
);
