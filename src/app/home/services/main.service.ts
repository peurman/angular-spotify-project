import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenresInterface } from '../models/genres.interface';
import { Categories } from '../models/categories.interface';
import { NewReleases } from '../models/new-releases.interface';
import { FeaturedPlaylists } from '../models/featured-playlists.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable()
export class MainService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getGenres(url: string | null): Observable<GenresInterface> {
    if (!url) {
      return this.http.get<GenresInterface>(
        `${BASE_API}/recommendations/available-genre-seeds?limit=15`,
        this.options
      );
    }
    return this.http.get<GenresInterface>(url, this.options);
  }
  getCategories(url: string | null): Observable<Categories> {
    if (!url) {
      return this.http.get<Categories>(
        `${BASE_API}/browse/categories?limit=10`,
        this.options
      );
    }
    return this.http.get<Categories>(url, this.options);
  }

  getNewReleases(url: string | null): Observable<NewReleases> {
    if (!url) {
      return this.http.get<NewReleases>(
        `${BASE_API}/browse/new-releases?country=AR&offset=0&limit=9`,
        this.options
      );
    }
    return this.http.get<NewReleases>(url, this.options);
  }

  getFeaturedPlaylists(url: string | null): Observable<FeaturedPlaylists> {
    if (!url) {
      return this.http.get<FeaturedPlaylists>(
        `${BASE_API}/browse/featured-playlists?&limit=8`,
        this.options
      );
    }
    return this.http.get<FeaturedPlaylists>(url, this.options);
  }
}
