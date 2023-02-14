import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  saveRemoveTrack(id: string, save: boolean) {
    if (save) {
      return this.http.put(`${this.BASE_API}/me/tracks`, { ids: [id] });
    } else {
      return this.http.delete(`${this.BASE_API}/me/tracks?ids=${id}`);
    }
  }
}
