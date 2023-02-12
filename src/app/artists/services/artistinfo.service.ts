import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/search/models/search.interface';

@Injectable()
export class ArtistinfoService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getArtistInfo(id: string): Observable<Artist> {
    return this.http.get<Artist>('https://api.spotify.com/v1/artists/' + id);
  }
}
