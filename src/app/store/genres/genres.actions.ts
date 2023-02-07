import { createAction, props } from '@ngrx/store';

export const getGenresAction = createAction('[Genres] Get Genres Action');
export const getGenresSuccessAction = createAction(
  '[Genres] Get Genres Success Action',
  props<{ data: string[] }>()
);
export const getGenresErrorAction = createAction(
  '[Genres] Get Genres Error Action',
  props<{ message: string }>()
);
