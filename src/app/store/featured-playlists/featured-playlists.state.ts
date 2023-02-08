import { Playlists } from 'src/app/home/models/featured-playlists.interface';

export interface FeaturedPlaylistsState {
  featuredPlaylistsData: Playlists | null;
  isLoading: boolean;
  isError: string | null;
}
