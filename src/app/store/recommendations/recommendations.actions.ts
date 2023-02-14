import { createAction, props } from '@ngrx/store';
import { GenreRecommendations } from 'src/app/genres/models/genres.interface';

export const getRecommendationsAction = createAction(
  '[Recommendations] Get Recommendations Action',
  props<{ genreName: string }>()
);
export const getRecommendationsSuccessAction = createAction(
  '[Recommendations] Get Recommendations Success Action',
  props<{ data: GenreRecommendations }>()
);
export const getRecommendationsErrorAction = createAction(
  '[Recommendations] Get Recommendations Error Action',
  props<{ message: string }>()
);
