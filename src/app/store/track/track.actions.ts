import { createAction, props } from '@ngrx/store';
import { Track } from 'src/app/profile/model/toptracks.interface';

export const getTrackAction = createAction(
  '[Track] Get Track Info',
  props<{ id: string }>()
);

export const getTrackSuccessAction = createAction(
  '[Track] Get Track Success',
  props<{ track: Track }>()
);

export const getTrackErrorAction = createAction(
  '[Track] Get Track Error',
  props<{ message: string }>()
);
