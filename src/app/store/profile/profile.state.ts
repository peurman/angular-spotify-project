import { TopArtists } from 'src/app/profile/model/topartists.interface';
import { TopTracks } from 'src/app/profile/model/toptracks.interface';

export interface ProfileState {
  topArtists: TopArtists | null;
  topTracks: TopTracks | null;
  isLoading: boolean;
  isError: string | null;
}
