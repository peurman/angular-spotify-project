import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresInterface } from '../models/genres.interface';
import { Categories } from '../models/categories.interface';
import { NewReleases } from '../models/new-releases.interface';
import { FeaturedPlaylists } from '../models/featured-playlists.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getGenres(): Observable<GenresInterface> {
    return this.http.get<GenresInterface>(
      `${BASE_API}/recommendations/available-genre-seeds`,
      this.options
    );
  }
  getCategories(url: string | null): Observable<Categories> {
    return this.http.get<Categories>(
      `${BASE_API}/browse/categories?limit=10`,
      this.options
    );
  }
  getNewReleases(): Observable<NewReleases> {
    return this.http.get<NewReleases>(
      `${BASE_API}/browse/new-releases?country=AR&offset=0&limit=10`,
      this.options
    );
  }
  getFeaturedPlaylists(): Observable<FeaturedPlaylists> {
    return this.http.get<FeaturedPlaylists>(
      `${BASE_API}/browse/featured-playlists`,
      this.options
    );
  }
}
