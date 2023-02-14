import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumDetail, AlbumsSaved } from '../models/albums.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getAlbumDetail(id: string): Observable<AlbumDetail> {
    return this.http.get<AlbumDetail>(`${BASE_API}/albums/${id}`, this.options);
  }
  getAlbumsSaved(): Observable<AlbumsSaved> {
    return this.http.get<AlbumsSaved>(`${BASE_API}/me/albums`, this.options);
  }
  saveAlbumToLibrary(id: string): Observable<void> {
    return this.http.put<void>(
      `${BASE_API}/me/albums?ids=${id}`,
      {},
      this.options
    );
  }
  removeAlbumFromLibrary(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_API}/me/albums?ids=${id}`);
  }
}
