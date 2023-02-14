import { createAction, props } from '@ngrx/store';
import {
  ArtistTracks,
  RelatedArtist,
} from 'src/app/artists/models/topartistracks.interface';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { Albums } from 'src/app/search/models/search.interface';

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

export const getArtistTracksAction = createAction(
  '[Artist] Get Artist Tracks',
  props<{ id: string }>()
);

export const getArtistTracksSucessAction = createAction(
  '[Artist] Get Artist Tracks Success Action',
  props<{ tracks: ArtistTracks }>()
);

export const getArtistTracksErrorAction = createAction(
  '[Artist] Get Artist Tracks Error Action',
  props<{ message: string }>()
);
//sdsa
export const getSuggestedArtist = createAction(
  '[Artist] Get Suggested Artist',
  props<{ id: string }>()
);

export const getSuggestedArtistSucessAction = createAction(
  '[Artist] Get Suggested Artist Success Action',
  props<{ artists: RelatedArtist }>()
);

export const getSuggestedArtistErrorAction = createAction(
  '[Artist] Get Suggested Artist Error Action',
  props<{ message: string }>()
);
