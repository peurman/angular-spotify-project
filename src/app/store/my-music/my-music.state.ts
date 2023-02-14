import {
  AlbumsSaved,
  ArtistsFollowed,
  TracksSaved,
  PlaylistsSaved,
} from 'src/app/my-music/models/my-music.interface';

export interface MyMusicState {
  playlists: {
    data: PlaylistsSaved | null;
    isLoading: boolean;
    isError: string | null;
  };
  tracks: {
    data: TracksSaved | null;
    isLoading: boolean;
    isError: string | null;
  };
  albums: {
    data: AlbumsSaved | null;
    isLoading: boolean;
    isError: string | null;
  };
  artists: {
    data: ArtistsFollowed | null;
    isLoading: boolean;
    isError: string | null;
  };
}
