import { createAction, props } from '@ngrx/store';
import { Playlists } from 'src/app/home/models/featured-playlists.interface';

export const getFeaturedPlaylistsAction = createAction(
  '[FeaturedPlaylists] Get Featured Playlists Action'
);
export const getFeaturedPlaylistsSuccessAction = createAction(
  '[FeaturedPlaylists] Get Featured Playlists Success Action',
  props<{ data: Playlists }>()
);
export const getFeaturedPlaylistsErrorAction = createAction(
  '[FeaturedPlaylists] Get Featured Playlists Error Action',
  props<{ message: string }>()
);
