import { Artist } from 'src/app/search/models/search.interface';

export interface ArtistState {
  artist: Artist | null;
  isLoading: boolean;
  isError: string | null;
}
