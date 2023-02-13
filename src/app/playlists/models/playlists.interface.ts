import { Track } from 'src/app/search/models/search.interface';
import { Owner } from 'src/app/search/models/search.interface';
import { Image } from 'src/app/search/models/search.interface';
import { ExternalUrls } from 'src/app/search/models/search.interface';

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
export interface Followers {
  href: null;
  total: number;
}
export interface Tracks {
  href: string;
  items?: Item[];
  limit?: number;
  next?: null;
  offset?: number;
  previous?: null;
  total: number;
}
export interface Item {
  added_at: Date;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}
export interface VideoThumbnail {
  url: null;
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
