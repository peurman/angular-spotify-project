import { createAction, props } from '@ngrx/store';
import {
  PlaylistsSaved,
  ArtistsFollowed,
  AlbumsSaved,
  TracksSaved,
} from 'src/app/my-music/models/my-music.interface';

export const getMyPlaylistsAction = createAction(
  '[MyPlaylists] Get MyPlaylists Action',
  props<{ url: string | null }>()
);
export const getMyPlaylistsSuccessAction = createAction(
  '[MyPlaylists] Get MyPlaylists Success Action',
  props<{ data: PlaylistsSaved }>()
);
export const getMyPlaylistsErrorAction = createAction(
  '[MyPlaylists] Get MyPlaylists Error Action',
  props<{ message: string }>()
);

export const getMyArtistsAction = createAction(
  '[MyArtists] Get MyArtists Action',
  props<{ url: string | null }>()
);
export const getMyArtistsSuccessAction = createAction(
  '[MyArtists] Get MyArtists Success Action',
  props<{ data: ArtistsFollowed }>()
);
export const getMyArtistsErrorAction = createAction(
  '[MyArtists] Get MyArtists Error Action',
  props<{ message: string }>()
);

export const getMyAlbumsAction = createAction(
  '[MyAlbums] Get MyAlbums Action',
  props<{ url: string | null }>()
);
export const getMyAlbumsSuccessAction = createAction(
  '[MyAlbums] Get MyAlbums Success Action',
  props<{ data: AlbumsSaved }>()
);
export const getMyAlbumsErrorAction = createAction(
  '[MyAlbums] Get MyAlbums Error Action',
  props<{ message: string }>()
);

export const getMyTracksAction = createAction(
  '[MyTracks] Get MyTracks Action',
  props<{ url: string | null }>()
);
export const getMyTracksSuccessAction = createAction(
  '[MyTracks] Get MyTracks Success Action',
  props<{ data: TracksSaved }>()
);
export const getMyTracksErrorAction = createAction(
  '[MyTracks] Get MyTracks Error Action',
  props<{ message: string }>()
);
