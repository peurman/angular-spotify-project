import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Albums, Artist } from 'src/app/home/models/new-releases.interface';
import { TopArtists } from '../model/topartists.interface';
import { TopTracks } from '../model/toptracks.interface';

const BASE_API = 'https://api.spotify.com/v1/me';

@Injectable({
  providedIn: 'root',
})
export class TopItems {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  getTopArtists(url: string | null): Observable<TopArtists> {
    if (!url) {
      return this.http.get<TopArtists>(
        `${BASE_API}/top/artists?limit=8`,
        this.options
      );
    }
    return this.http.get<TopArtists>(url, this.options);
  }

  getTopTracks(url: string | null): Observable<TopTracks> {
    if (!url) {
      return this.http.get<TopTracks>(
        `${BASE_API}/top/tracks?limit=8`,
        this.options
      );
    }
    return this.http.get<TopTracks>(url, this.options);
  }

  checkFollowing(artistList: Artist[]): Observable<boolean[]> {
    const ids: string[] = [];
    artistList.forEach((artist) => {
      ids.push(artist.id);
    });
    return this.http.get<boolean[]>(
      `${BASE_API}/following/contains?type=artist&ids=${ids.join(',')}`
    );
  }
  followUnfollowArtist(follow: boolean, type: string, id: string) {
    if (!follow) {
      return this.http.delete(`${BASE_API}/following?type=${type}&ids=${id}`);
    }
    return this.http.put(`${BASE_API}/following?type=${type}&ids=${id}`, {});
  }
}
