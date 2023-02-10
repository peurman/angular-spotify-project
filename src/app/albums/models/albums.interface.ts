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
export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Copyright {
  text: string;
  type: string;
}
export interface ExternalIDS {
  upc: string;
}
export interface Image {
  height: number;
  url: string;
  width: number;
}
export interface Tracks {
  href: string;
  items: Track[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
}
