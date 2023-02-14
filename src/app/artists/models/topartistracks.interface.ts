import { Artist } from 'src/app/home/models/new-releases.interface';
import { Track } from 'src/app/search/models/search.interface';

export interface ArtistTracks {
  tracks: Track[];
}

export interface RelatedArtist {
  artists: Artist[];
}
