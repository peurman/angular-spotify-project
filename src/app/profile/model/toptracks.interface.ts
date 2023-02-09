import { Album } from 'src/app/home/models/new-releases.interface';

export interface TopTracks {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Track {
  album: Album;
  name: string;
  preview_url: string;
}
