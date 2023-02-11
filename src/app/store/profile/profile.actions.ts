import { createAction, props } from '@ngrx/store';
import { TopArtists } from 'src/app/profile/model/topartists.interface';
import { TopTracks } from 'src/app/profile/model/toptracks.interface';

export const getTopArtistsAction = createAction(
  '[Profile] Get Top Artists',
  props<{ url: string | null }>()
);
export const getTopArtistsSuccessAction = createAction(
  '[Profile] Get Top Artists Success Action',
  props<{ data: TopArtists }>()
);

export const getTopArtistsErrorAction = createAction(
  '[Profile] Get Top Artists Error Action',
  props<{ message: string }>()
);

//topTracks
export const getTopTracksAction = createAction(
  '[Profile] Get Top Tracks',
  props<{ url: string | null }>()
);
export const getTopTracksSuccessAction = createAction(
  '[Profile] Get Top Tracks Success Action',
  props<{ data: TopTracks }>()
);

export const getTopTracksErrorAction = createAction(
  '[Profile] Get Top Tracks Error Action',
  props<{ message: string }>()
);

//unfollow
export const unFollowArtistsAction = createAction(
  '[Profile] UnFollow Artist',
  props<{ id: string }>()
);
export const unFollowArtistsSuccessAction = createAction(
  '[Profile] UnFollow Artist Succesfull',
  props<{ id: string }>()
);

export const unFollowArtistsErrorAction = createAction(
  '[Profile] UnFollow Artist Error',
  props<{ message: string }>()
);

//follow
export const followArtistsAction = createAction(
  '[Profile] Follow Artist',
  props<{ id: string }>()
);
export const followArtistsSuccessAction = createAction(
  '[Profile] Folow Artist Succesfull',
  props<{ id: string }>()
);

export const followArtistsErrorAction = createAction(
  '[Profile] Follow Artist Error',
  props<{ message: string }>()
);
