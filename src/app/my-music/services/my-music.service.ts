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
export class MyMusicService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getAlbumsSaved(url: string | null): Observable<AlbumsSaved> {
    if (!url) {
      return this.http.get<AlbumsSaved>(
        `${BASE_API}/me/albums?limit=9`,
        this.options
      );
    }
    return this.http.get<AlbumsSaved>(url, this.options);
  }
  getPlaylistsSaved(url: string | null): Observable<PlaylistsSaved> {
    if (!url) {
      return this.http.get<PlaylistsSaved>(
        `${BASE_API}/me/playlists?limit=9`,
        this.options
      );
    }
    return this.http.get<PlaylistsSaved>(url, this.options);
  }
  getTracksSaved(url: string | null): Observable<TracksSaved> {
    if (!url) {
      return this.http.get<TracksSaved>(
        `${BASE_API}/me/tracks?limit=15`,
        this.options
      );
    }
    return this.http.get<TracksSaved>(url, this.options);
  }
  getArtistsFollowed(url: string | null): Observable<ArtistsFollowed> {
    if (!url) {
      return this.http.get<ArtistsFollowed>(
        `${BASE_API}/me/following?type=artist&limit=50`,
        this.options
      );
    }
    return this.http.get<ArtistsFollowed>(url, this.options);
  }
}
