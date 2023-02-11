import { Track } from 'src/app/profile/model/toptracks.interface';

export interface TrackState {
  track: Track | null;
  isLoading: boolean;
  isError: string | null;
}
