import { createAction, props } from '@ngrx/store';
import { Albums, Artist } from 'src/app/home/models/new-releases.interface';

export const getArtistAction = createAction(
  '[Artist] Get Artist Action',
  props<{ id: string }>()
);

export const getArtistSucessAction = createAction(
  '[Artist] Get Artist Success Action',
  props<{ data: Artist }>()
);

export const getArtistErrorAction = createAction(
  '[Artist] Get Artist Error Action',
  props<{ message: string }>()
);

export const getArtistAlbumsAction = createAction(
  '[Artist] Get Artist Albums',
  props<{ id: string; url: string | null }>()
);

export const getArtistAlbumsSucessAction = createAction(
  '[Artist] Get Artist Albums Success Action',
  props<{ data: Albums }>()
);

export const getArtistAlbumsErrorAction = createAction(
  '[Artist] Get Artist Albums Error Action',
  props<{ message: string }>()
);
