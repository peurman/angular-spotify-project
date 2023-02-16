import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SearchAlbum,
  SearchArtist,
  SearchPlaylist,
  SearchTracks,
} from '../models/search.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  // Artists
  getArtistsSearched(
    url: string | null,
    termSearched: string | null
  ): Observable<SearchArtist> {
    if (!url) {
      return this.http.get<SearchArtist>(
        `${BASE_API}/search?q=%22${termSearched}%22&type=artist&limit=8`,
        this.options
      );
    }
    return this.http.get<SearchArtist>(url, this.options);
  }
  // Albums
  getAlbumsSearched(
    url: string | null,
    termSearched: string | null
  ): Observable<SearchAlbum> {
    if (!url) {
      return this.http.get<SearchAlbum>(
        `${BASE_API}/search?q=%22${termSearched}%22&type=album&limit=9`,
        this.options
      );
    }
    return this.http.get<SearchAlbum>(url, this.options);
  }
  // Playlists
  getPlaylistsSearched(
    url: string | null,
    termSearched: string | null
  ): Observable<SearchPlaylist> {
    if (!url) {
      return this.http.get<SearchPlaylist>(
        `${BASE_API}/search?q=%22${termSearched}%22&type=playlist&limit=9`,
        this.options
      );
    }
    return this.http.get<SearchPlaylist>(url, this.options);
  }
  // Tracks
  getTracksSearched(
    url: string | null,
    termSearched: string | null
  ): Observable<SearchTracks> {
    if (!url) {
      return this.http.get<SearchTracks>(
        `${BASE_API}/search?q=%22${termSearched}%22&type=track&limit=8`,
        this.options
      );
    }
    return this.http.get<SearchTracks>(url, this.options);
  }
}
