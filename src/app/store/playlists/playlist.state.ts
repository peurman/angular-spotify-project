import { Playlist } from 'src/app/playlists/models/playlists.interface';

export interface PlaylistState {
  playlistData: Playlist | null;
  isLoading: boolean;
  isError: string | null;
}
