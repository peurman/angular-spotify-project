import { createAction, props } from '@ngrx/store';
import { Playlist } from 'src/app/playlists/models/playlists.interface';

export const getPlaylistAction = createAction(
  '[Playlist] Get Playlist Action',
  props<{ id: string }>()
);
export const getPlaylistSuccessAction = createAction(
  '[Playlist] Get Playlist Success Action',
  props<{ data: Playlist }>()
);
export const getPlaylistErrorAction = createAction(
  '[Playlist] Get Playlist Error Action',
  props<{ message: string }>()
);
