import { Albums, Track } from 'src/app/search/models/search.interface';

const externalIDS = {
  isrc: 'string',
};

const externalUrls = {
  spotify: 'test',
};

export const artist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d',
  },
  href: 'https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d',
  id: '1dfeR4HaWDbWqFHLkxsg1d',
  name: 'Queen',
  type: 'artist',
  uri: 'spotify:artist:1dfeR4HaWDbWqFHLkxsg1d',
  followers: {
    href: null,
    total: 1234567,
  },
  genres: ['rock'],
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5ebbdb6e0fd6a3e6b3f6e9ac6a4',
      width: 640,
    },
  ],
  popularity: 85,
};

export const album = {
  album_type: 'album',
  artists: [artist],
  available_markets: ['US', 'CA', 'GB', 'FR', 'JP'],
  external_urls: {
    spotify: 'https://open.spotify.com/album/6i6folBtxKV28WX3msQ4FE',
  },
  href: 'https://api.spotify.com/v1/albums/6i6folBtxKV28WX3msQ4FE',
  id: '6i6folBtxKV28WX3msQ4FE',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5ebbdb6e0fd6a3e6b3f6e9ac6a4',
      width: 640,
    },
  ],
  name: 'A Night At The Opera (Deluxe Edition 2011 Remaster)',
  release_date: new Date('2011-01-01'),
  release_date_precision: 'day',
  total_tracks: 33,
  type: 'album',
  uri: 'spotify:album:6i6folBtxKV28WX3msQ4FE',
};

export const track: Track = {
  album: album,
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d',
      },
      href: 'https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d',
      id: '1dfeR4HaWDbWqFHLkxsg1d',
      name: 'Queen',
      type: 'artist',
      uri: 'spotify:artist:1dfeR4HaWDbWqFHLkxsg1d',
      followers: {
        href: null,
        total: 1234567,
      },
      genres: ['rock'],
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab6761610000e5ebbdb6e0fd6a3e6b3f6e9ac6a4',
          width: 640,
        },
      ],
      popularity: 85,
    },
  ],
  available_markets: ['US', 'CA', 'GB', 'FR', 'JP'],
  disc_number: 2,
  duration_ms: 200,
  explicit: false,
  external_ids: externalIDS,
  external_urls: externalUrls,
  href: 'test',
  id: 'test',
  is_local: false,
  name: 'test',
  popularity: 200,
  preview_url: 'test',
  track_number: 2,
  type: 'single',
  uri: 'test',
};
