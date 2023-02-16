import {
  Playlist,
  Track,
  Tracks,
} from 'src/app/search/models/search.interface';
const album = {
  album_type: 'album',
  artists: [
    {
      external_urls: { spotify: 'https://open.spotify.com/artist/123' },
      href: 'https://api.spotify.com/v1/artists/123',
      id: '123',
      name: 'Artist 1',
      type: 'artist',
      uri: 'spotify:artist:123',
      followers: {
        href: null,
        total: 1000,
      },
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/123',
          width: 640,
        },
      ],
    },
  ],
  available_markets: ['US', 'CA', 'GB'],
  external_urls: { spotify: 'https://open.spotify.com/album/123' },
  href: 'https://api.spotify.com/v1/albums/123',
  id: '123',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/123',
      width: 640,
    },
  ],
  name: 'Album 1',
  release_date: new Date('2020-01-01'),
  release_date_precision: 'day',
  total_tracks: 10,
  type: 'album',
  uri: 'spotify:album:123',
};
const trackObj: Track = {
  album: album,
  artists: [
    {
      external_urls: { spotify: 'https://open.spotify.com/artist/456' },
      href: 'https://api.spotify.com/v1/artists/456',
      id: '456',
      name: 'Artist 2',
      type: 'artist',
      uri: 'spotify:artist:456',
      followers: {
        href: null,
        total: 5000,
      },
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/456',
          width: 640,
        },
      ],
    },
  ],
  available_markets: ['US', 'CA'],
  disc_number: 1,
  duration_ms: 300000,
  episode: false,
  explicit: true,
  external_ids: {
    isrc: 'US-abc-12-34567',
  },
  external_urls: { spotify: 'https://open.spotify.com/track/123' },
  href: 'https://api.spotify.com/v1/tracks/123',
  id: '123',
  is_local: false,
  name: 'Track 1',
  popularity: 75,
  preview_url: 'https://p.scdn.co/mp3-preview/123',
  track: true,
  track_number: 3,
  type: 'track',
  uri: 'spotify:track:123',
  saved: true,
};

export const tracks: Tracks = {
  href: 'string',
  items: [trackObj],
  limit: 2,
  next: 'string',
  offset: 2,
  previous: null,
  total: 2,
};

export const playlist: Playlist = {
  collaborative: false,
  description: 'A collection of the best jazz tracks of all time',
  external_urls: {
    spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1',
  },
  href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWVqfgj8NZEp1',
  id: '37i9dQZF1DWVqfgj8NZEp1',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/ab67706f00000002b7cb3f3d833f7a2904075dc9',
      width: 640,
    },
    {
      height: 300,
      url: 'https://i.scdn.co/image/ab67706f00000002b7cb3f3d833f7a2904075dc9',
      width: 300,
    },
    {
      height: 60,
      url: 'https://i.scdn.co/image/ab67706f00000002b7cb3f3d833f7a2904075dc9',
      width: 60,
    },
  ],
  name: 'Best Jazz Tracks',
  owner: {
    external_urls: {
      spotify: 'https://open.spotify.com/user/spotify',
    },
    href: 'https://api.spotify.com/v1/users/spotify',
    id: 'spotify',
    type: 'user',
    uri: 'spotify:user:spotify',
  },
  primary_color: null,
  public: null,
  snapshot_id:
    'MTYzMjEyNTYzMCwwMDAwMDA4NjAwMDAwMTYzZjA1ZDNiOWQwMDAwMDE2M2ZhMThjNDA3',
  tracks: tracks,
  type: 'playlist',
  uri: 'spotify:playlist:37i9dQZF1DWVqfgj8NZEp1',
  followers: {
    href: null,
    total: 1000000,
  },
};
