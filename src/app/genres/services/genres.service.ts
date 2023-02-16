import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenreRecommendations } from '../models/genres.interface';

const BASE_API = 'https://api.spotify.com/v1';

@Injectable()
export class GenresService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getRecommendationsByGenre(
    genreName: string
  ): Observable<GenreRecommendations> {
    return this.http.get<GenreRecommendations>(
      `${BASE_API}/recommendations?seed_genres=${genreName}`,
      this.options
    );
  }
}
