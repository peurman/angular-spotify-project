import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Albums, Artist } from 'src/app/home/models/new-releases.interface';

@Injectable()
export class ArtistinfoService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getArtistInfo(id: string): Observable<Artist> {
    return this.http.get<Artist>('https://api.spotify.com/v1/artists/' + id);
  }
  getArtistAlbums(id: string | null, url: string | null): Observable<Albums> {
    if (!url) {
      return this.http.get<Albums>(
        `	https://api.spotify.com/v1/artists/${id}/albums?limit=9`
      );
    } else {
      return this.http.get<Albums>(url);
    }
  }
}
