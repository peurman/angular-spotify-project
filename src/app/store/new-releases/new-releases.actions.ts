import { createAction, props } from '@ngrx/store';
import { Albums } from 'src/app/home/models/new-releases.interface';

export const getNewReleasesAction = createAction(
  '[NewReleases] Get New Releases Action',
  props<{ url: string | null }>()
);
export const getNewReleasesSuccessAction = createAction(
  '[NewReleases] Get New Releases Success Action',
  props<{ data: Albums }>()
);
export const getNewReleasesErrorAction = createAction(
  '[NewReleases] Get New Releases Error Action',
  props<{ message: string }>()
);
