import { createAction, props } from '@ngrx/store';
import { Artists } from 'src/app/search/models/search.interface';

export const getSearchArtistsAction = createAction(
  '[SearchArtists] Get Search Artists Action',
  props<{ url: string | null; searchedTerm: string }>()
);
export const getSearchArtistsSuccessAction = createAction(
  '[SearchArtists] Get Search Artists Success Action',
  props<{ data: Artists }>()
);
export const getSearchArtistsErrorAction = createAction(
  '[SearchArtists] Get Search ArtistsError Action',
  props<{ message: string }>()
);
