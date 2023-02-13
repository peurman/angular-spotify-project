//MOVE TO CORE?
//ARTISTS
export interface SearchArtist {
  artists: Artists;
}
export interface Artists {
  href: string;
  items: Artist[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  followers?: Followers;
  genres?: string[];
  images: Image[];
  popularity?: number;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Followers {
  href: null;
  total: number;
}
export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

//ALBUMS
export interface SearchAlbum {
  albums: Albums;
}
export interface Albums {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights?: Copyright[];
  external_ids?: ExternalIDS;
  external_urls: ExternalUrls;
  genres?: string[];
  href: string;
  id: string;
  images: Image[];
  label?: string;
  name: string;
  popularity?: number;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  tracks?: Tracks;
  type: string;
  uri: string;
}
export interface Copyright {
  text: string;
  type: string;
}
//PLAYLISTS
export interface SearchPlaylist {
  playlists: Playlists;
}
export interface Playlists {
  href: string;
  items: Playlist[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  name?: string;
}
export interface Tracks {
  href: string;
  total: number;
}

// TRACKS
export interface SearchTracks {
  tracks: Tracks;
}
export interface Tracks {
  href: string;
  items: Track[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track?: boolean;
  track_number: number;
  type: string;
  uri: string;
}
export interface ExternalIDS {
  isrc: string;
}
