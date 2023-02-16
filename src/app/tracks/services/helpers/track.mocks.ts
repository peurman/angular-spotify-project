import { Album, ArtistType } from 'src/app/home/models/new-releases.interface';

export const album: Album = {
  album_type: 'album',
  artists: [
    {
      isFollowing: false,
      external_urls: { spotify: 'https://open.spotify.com/artist/123' },
      href: 'https://api.spotify.com/v1/artists/123',
      id: '123',
      name: 'Artist 1',
      type: ArtistType.Artist,
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
