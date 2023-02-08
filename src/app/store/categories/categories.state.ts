import { CategoriesClass } from 'src/app/home/models/categories.interface';

export interface CategoriesState {
  categoriesData: CategoriesClass | null;
  isLoading: boolean;
  isError: string | null;
}
