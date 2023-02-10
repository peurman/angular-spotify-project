import { Tracks } from 'src/app/search/models/search.interface';

export interface SearchTracksState {
  searchTracksData: Tracks | null;
  isLoading: boolean;
  isError: string | null;
}
