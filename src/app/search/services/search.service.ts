import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchArtist } from '../models/search.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  //artists
  getArtistsSearched(
    url: string | null,
    termSearched: string
  ): Observable<SearchArtist> {
    if (!url) {
      return this.http.get<SearchArtist>(
        `${BASE_API}/search?q=%22${termSearched}%22&type=artist&limit=9`,
        this.options
      );
    }
    return this.http.get<SearchArtist>(url, this.options);
  }
}
