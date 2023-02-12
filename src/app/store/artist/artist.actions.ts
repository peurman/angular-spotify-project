import { createAction, props } from '@ngrx/store';
import { Artist } from 'src/app/search/models/search.interface';

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
