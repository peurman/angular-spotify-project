import { GenreRecommendations } from 'src/app/genres/models/genres.interface';

export interface RecommendationsState {
  recommendationsData: GenreRecommendations | null;
  isLoading: boolean;
  isError: string | null;
}
