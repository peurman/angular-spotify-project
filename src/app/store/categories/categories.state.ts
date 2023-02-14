import { PlayListCategory } from 'src/app/categories/models/playlist.interface';
import {
  CategoriesClass,
  Category,
} from 'src/app/home/models/categories.interface';

export interface CategoriesState {
  categoriesData: CategoriesClass | null;
  playlists: PlayListCategory | null;
  categorySelected: Category | null;
  isLoading: boolean;
  isError: string | null;
}
