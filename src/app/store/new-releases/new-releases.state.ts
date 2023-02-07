import { Albums } from 'src/app/home/models/new-releases.interface';

export interface NewReleasesState {
  newReleasesData: Albums | null;
  isLoading: boolean;
  isError: string | null;
}
