import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresInterface } from '../models/genres.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getGenres(): Observable<GenresInterface> {
    return this.http
      .get<GenresInterface>(
        `${BASE_API}/recommendations/available-genre-seeds`,
        this.options
      )
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
