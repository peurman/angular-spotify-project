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

export const saveRemoveAlbumAction = createAction(
  '[Album] Save/Remove Action',
  props<{ id: string; save: boolean }>()
);
export const saveRemoveAlbumSuccessAction = createAction(
  '[Album] Save/Remove Success Action',
  props<{ id: string }>()
);
export const saveRemoveAlbumErrorAction = createAction(
  '[Album] Save/Remove Error Action',
  props<{ message: string }>()
);
