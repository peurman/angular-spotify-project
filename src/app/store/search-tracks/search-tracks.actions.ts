import { createAction, props } from '@ngrx/store';
import { Tracks } from 'src/app/search/models/search.interface';

export const getSearchTracksAction = createAction(
  '[SearchTracks] Get Search Tracks Action',
  props<{ url: string | null; searchedTerm: string }>()
);
export const getSearchTracksSuccessAction = createAction(
  '[SearchTracks] Get Search Tracks Success Action',
  props<{ data: Tracks }>()
);
export const getSearchTracksErrorAction = createAction(
  '[SearchTracks] Get Search TracksError Action',
  props<{ message: string }>()
);
