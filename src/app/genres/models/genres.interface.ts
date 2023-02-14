import { Track } from 'src/app/search/models/search.interface';

export interface GenreRecommendations {
  tracks: Track[];
  seeds: Seed[];
}
export interface Seed {
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
  id: string;
  type: string;
  href: null;
}
