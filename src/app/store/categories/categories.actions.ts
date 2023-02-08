import { createAction, props } from '@ngrx/store';
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
