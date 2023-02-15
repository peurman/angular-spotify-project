import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { Albums } from 'src/app/search/models/search.interface';
import {
  ArtistTracks,
  RelatedArtist,
} from '../models/topartistracks.interface';

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
        `https://api.spotify.com/v1/artists/${id}/albums?limit=9`
      );
    } else {
      return this.http.get<Albums>(url);
    }
  }
  getArtistTopTracks(id: string): Observable<ArtistTracks> {
    return this.http.get<ArtistTracks>(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`
    );
  }
  getSuggestedArtist(id: string): Observable<RelatedArtist> {
    return this.http.get<RelatedArtist>(
      `https://api.spotify.com/v1/artists/${id}/related-artists`
    );
  }
}
