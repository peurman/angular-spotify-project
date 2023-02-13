import { Artists } from 'src/app/search/models/search.interface';
import { Track } from 'src/app/search/models/search.interface';
import { Album } from 'src/app/search/models/search.interface';
import { Playlist } from 'src/app/search/models/search.interface';

export interface ArtistsFollowed {
  artists: Artists;
}

export interface TracksSaved {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface Item {
  added_at: Date;
  track: Track;
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

export interface PlaylistsSaved {
  href: string;
  items: Playlist[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}
