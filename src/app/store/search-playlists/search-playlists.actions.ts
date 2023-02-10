import { createAction, props } from '@ngrx/store';
import { Playlists } from 'src/app/search/models/search.interface';

export const getSearchPlaylistsAction = createAction(
  '[SearchPlaylists] Get Search Playlists Action',
  props<{ url: string | null; searchedTerm: string }>()
);
export const getSearchPlaylistsSuccessAction = createAction(
  '[SearchPlaylists] Get Search Playlists Success Action',
  props<{ data: Playlists }>()
);
export const getSearchPlaylistsErrorAction = createAction(
  '[SearchPlaylists] Get Search PlaylistsError Action',
  props<{ message: string }>()
);
