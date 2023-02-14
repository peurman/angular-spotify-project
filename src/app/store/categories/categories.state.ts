import { PlayListCategory } from 'src/app/categories/models/playlist.interface';
import { CategoriesClass } from 'src/app/home/models/categories.interface';

export interface CategoriesState {
  categoriesData: CategoriesClass | null;
  playlists: PlayListCategory | null;
  isLoading: boolean;
  isError: string | null;
}
