import { createAction, props } from '@ngrx/store';
import { PlayListCategory } from 'src/app/categories/models/playlist.interface';
import { CategoriesClass } from 'src/app/home/models/categories.interface';

export const getCategoriesAction = createAction(
  '[Category] Get Categories Action',
  props<{ url: string | null }>()
);
export const getCategoriesSuccessAction = createAction(
  '[Category] Get Categories Success Action',
  props<{ data: CategoriesClass }>()
);
export const getCategoriesErrorAction = createAction(
  '[Category] Get Categories Error Action',
  props<{ message: string }>()
);

export const getCategoriesPlaylistAction = createAction(
  '[Category] Get Playlist',
  props<{ id: string }>()
);
export const getCategoriesPlaylistSuccessAction = createAction(
  '[Category] Get Playlist Success Action',
  props<{ playlists: PlayListCategory }>()
);
export const getCategoriesPlaylistErrorAction = createAction(
  '[Category] Get Playlist Error Action',
  props<{ message: string }>()
);
