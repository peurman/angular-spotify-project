import { AlbumDetail } from 'src/app/albums/models/albums.interface';

export interface AlbumDetailState {
  albumDetailData: AlbumDetail | null;
  isLoading: boolean;
  isError: string | null;
}
