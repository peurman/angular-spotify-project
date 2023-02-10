import { Albums } from 'src/app/search/models/search.interface';

export interface SearchAlbumsState {
  searchAlbumsData: Albums | null;
  isLoading: boolean;
  isError: string | null;
}
