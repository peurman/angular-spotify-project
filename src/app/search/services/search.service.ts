import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchAlbum, SearchArtist } from '../models/search.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
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
}
