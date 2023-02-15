import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist, Albums, Track } from 'src/app/search/models/search.interface';

const BASE_API = 'https://api.spotify.com/v1/me';

@Injectable()
export class CheckerService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: this.headers };

  checkFollowing(artistList: Artist[]): Observable<boolean[]> {
    const ids: string[] = [];
    artistList.forEach((artist) => {
      ids.push(artist.id);
    });
    return this.http.get<boolean[]>(
      `${BASE_API}/following/contains?type=artist&ids=${ids.join(',')}`
    );
  }
  checkSavedAlbum(albumList: Albums): Observable<boolean[]> {
    const ids: string[] = [];
    albumList.items.forEach((album) => {
      ids.push(album.id);
    });
    return this.http.get<boolean[]>(
      `${BASE_API}/albums/contains?ids=${ids.join(',')}`
    );
  }
  checkSavedTracks(tracks: Track[]): Observable<boolean[]> {
    const ids: string[] = [];
    tracks.forEach((track) => {
      ids.push(track.id);
    });
    return this.http.get<boolean[]>(
      `${BASE_API}/tracks/contains?ids=${ids.join(',')}`
    );
  }
  saveRemoveAlbumFromLibrary(id: string, save: boolean): Observable<void> {
    if (!save) {
      return this.http.delete<void>(`${BASE_API}/albums?ids=${id}`);
    } else {
      return this.http.put<void>(`${BASE_API}/albums`, { ids: [id] });
    }
  }
  followUnfollowArtist(follow: boolean, type: string, id: string) {
    if (!follow) {
      return this.http.delete(`${BASE_API}/following?type=${type}&ids=${id}`);
    }
    return this.http.put(`${BASE_API}/following?type=${type}&ids=${id}`, {});
  }
}
