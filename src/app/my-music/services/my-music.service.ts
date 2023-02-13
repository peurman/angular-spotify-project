import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TracksSaved,
  PlaylistsSaved,
  ArtistsFollowed,
  AlbumsSaved,
} from '../models/my-music.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbumsSaved(): Observable<AlbumsSaved> {
    const token = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    return this.http.get<AlbumsSaved>(`${BASE_API}/me/albums`, {
      headers: new HttpHeaders({
        skip: 'true',
        Authorization: `Bearer ${token.access_token}`,
      }),
    });
  }
  getPlaylistsSaved(): Observable<PlaylistsSaved> {
    const token = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    return this.http.get<PlaylistsSaved>(`${BASE_API}/me/playlists?limit=50`, {
      headers: new HttpHeaders({
        skip: 'true',
        Authorization: `Bearer ${token.access_token}`,
      }),
    });
  }
  getTracksSaved(): Observable<TracksSaved> {
    const token = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    return this.http.get<TracksSaved>(`${BASE_API}/me/tracks?limit=50`, {
      headers: new HttpHeaders({
        skip: 'true',
        Authorization: `Bearer ${token.access_token}`,
      }),
    });
  }
  getArtistsFollowed(): Observable<ArtistsFollowed> {
    const token = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    return this.http.get<ArtistsFollowed>(
      `${BASE_API}/me/following?type=artist`,
      {
        headers: new HttpHeaders({
          skip: 'true',
          Authorization: `Bearer ${token.access_token}`,
        }),
      }
    );
  }
}
