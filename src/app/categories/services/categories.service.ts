import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayListCategory } from '../models/playlist.interface';

const BASE_API = 'https://api.spotify.com/v1/';

@Injectable({
  providedIn: 'root', //removethis
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };
  getCategoriesPlayLists(id: string): Observable<PlayListCategory> {
    return this.http.get<PlayListCategory>(
      `${BASE_API}browse/categories/${id}/playlists`
    );
  }
}
