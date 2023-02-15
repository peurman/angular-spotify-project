import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist, PlaylistsSaved } from '../models/playlists.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getPlaylist(id: string | null, url: string | null): Observable<Playlist> {
    if (!url) {
      return this.http.get<Playlist>(
        `${BASE_API}/playlists/${id}`,
        this.options
      );
    }
    console.log('ENTRA ACA???: GET:', url);
    return this.http.get<Playlist>(url, this.options);
  }
  getPlaylistsSaved(): Observable<PlaylistsSaved> {
    return this.http.get<PlaylistsSaved>(`${BASE_API}/me/playlists?limit=50`);
  }
  followPlaylist(id: string): Observable<void> {
    return this.http.put<void>(`${BASE_API}/playlists/${id}/followers`, {});
  }
  unfollowPlaylist(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_API}/playlists/${id}/followers`);
  }
}
