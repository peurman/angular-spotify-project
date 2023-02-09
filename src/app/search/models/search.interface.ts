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
  images?: Image[];
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
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface SearchPlaylist {
  playlists: Playlists;
}

export interface Playlists {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
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
  type: ItemType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: string;
}

export enum OwnerType {
  User = 'user',
}

export interface Tracks {
  href: string;
  total: number;
}

export enum ItemType {
  Playlist = 'playlist',
}
