import { Artists } from 'src/app/search/models/search.interface';

export interface SearchArtistsState {
  searchArtistsData: Artists | null;
  isLoading: boolean;
  isError: string | null;
}
