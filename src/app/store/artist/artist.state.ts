import { Albums, Artist } from 'src/app/home/models/new-releases.interface';

export interface ArtistState {
  artistAlbums: Albums | null;
  artist: Artist | null;
  isLoading: boolean;
  isError: string | null;
}
