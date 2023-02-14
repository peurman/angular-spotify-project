import { AlbumDetail } from 'src/app/albums/models/albums.interface';

export interface AlbumDetailState {
  albumData: AlbumDetail | null;
  isLoading: boolean;
  isError: string | null;
}
