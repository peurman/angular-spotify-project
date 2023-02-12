import { createAction, props } from '@ngrx/store';
import { AlbumDetail } from 'src/app/albums/models/albums.interface';

export const getAlbumDetailAction = createAction(
  '[AlbumDetail] Get Album Detail Action',
  props<{ id: string }>()
);
export const getAlbumDetailSuccessAction = createAction(
  '[AlbumDetail] Get Album Detail Success Action',
  props<{ data: AlbumDetail }>()
);
export const getAlbumDetailErrorAction = createAction(
  '[AlbumDetail] Get Album Detail Error Action',
  props<{ message: string }>()
);
