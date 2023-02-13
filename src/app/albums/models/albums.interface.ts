import { Track } from 'src/app/search/models/search.interface';
import { Album } from 'src/app/search/models/search.interface';
import { ExternalIDS } from 'src/app/search/models/search.interface';
import { ExternalUrls } from 'src/app/search/models/search.interface';
import { Image } from 'src/app/search/models/search.interface';
import { Copyright } from 'src/app/search/models/search.interface';
import { Artist } from 'src/app/search/models/search.interface';

export interface AlbumDetail {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  tracks: Tracks;
  type: string;
  uri: string;
}
export interface Tracks {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
export interface AlbumsSaved {
  href: string;
  items: AlbumSavedItem[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}
export interface AlbumSavedItem {
  added_at: Date;
  album: Album;
}
