import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Track } from 'src/app/profile/model/toptracks.interface';

@Injectable()
export class TrackService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };
  BASE_API = 'https://api.spotify.com/v1';

  getTrackInfo(id: string) {
    return this.http.get<Track>(`${this.BASE_API}/tracks/${id}`);
  }
  removeTrack(id: string) {
    return this.http.delete<Track>(`${this.BASE_API}/me/tracks?ids=${id}`);
  }
}
