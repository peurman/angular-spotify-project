import {
  ArtistTracks,
  RelatedArtist,
} from 'src/app/artists/models/topartistracks.interface';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { Albums } from 'src/app/search/models/search.interface';

export interface ArtistState {
  artistAlbums: Albums | null;
  artist: Artist | null;
  relatedArtists: RelatedArtist | null;
  tracks: ArtistTracks | null;
  isLoading: boolean;
  isError: string | null;
}
