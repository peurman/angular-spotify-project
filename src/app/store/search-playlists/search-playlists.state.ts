import { Playlists } from 'src/app/search/models/search.interface';

export interface SearchPlaylistsState {
  searchPlaylistsData: Playlists | null;
  isLoading: boolean;
  isError: string | null;
}
