import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckerService } from './checker.service';
import { Artist, Albums, Track } from 'src/app/search/models/search.interface';
import { album, artist, track } from './helpers/checker.mocks';

describe('CheckerService', () => {
  let service: CheckerService;
  let httpMock: HttpTestingController;
  const BASE_API = 'https://api.spotify.com/v1/me';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckerService],
    });

    service = TestBed.inject(CheckerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkFollowing should return boolean array', () => {
    const artists: Artist[] = [artist];
    const expectedResponse: boolean[] = [true];

    service.checkFollowing(artists).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne(
      `${BASE_API}/following/contains?type=artist&ids=1dfeR4HaWDbWqFHLkxsg1d`
    );
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('checkSavedAlbum should return boolean array', () => {
    const albums: Albums = {
      href: 'test',
      items: [album],
      limit: 2,
      next: 'string',
      offset: 2,
      previous: null,
      total: 2,
    };
    const expectedResponse: boolean[] = [true];

    service.checkSavedAlbum(albums).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne(
      `${BASE_API}/albums/contains?ids=6i6folBtxKV28WX3msQ4FE`
    );
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('checkSavedTracks should return boolean array', () => {
    const tracks: Track[] = [track];
    const expectedResponse: boolean[] = [true];

    service.checkSavedTracks(tracks).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne(`${BASE_API}/tracks/contains?ids=test`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedResponse);
  });

  it('saveRemoveAlbumFromLibrary should send DELETE request if save is false', () => {
    const albumId = 'id1';
    const save = false;

    service.saveRemoveAlbumFromLibrary(albumId, save).subscribe();

    const request = httpMock.expectOne(`${BASE_API}/albums?ids=${albumId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

  it('saveRemoveAlbumFromLibrary should send PUT request if save is true', () => {
    const albumId = 'id1';
    const save = true;

    service.saveRemoveAlbumFromLibrary(albumId, save).subscribe();

    const request = httpMock.expectOne(`${BASE_API}/albums`);
    expect(request.request.method).toBe('PUT');
    request.flush(null);
  });

  it('followUnfollowArtist should send DELETE request if follow is false', () => {
    const artistId = 'id1';
    const type = 'artist';
    const follow = false;

    service.followUnfollowArtist(follow, type, artistId).subscribe();

    const request = httpMock.expectOne(
      `${BASE_API}/following?type=${type}&ids=${artistId}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
  it('followUnfollowArtist should send PUT request if follow is true', () => {
    const artistId = 'id1';
    const type = 'artist';
    const follow = true;

    service.followUnfollowArtist(follow, type, artistId).subscribe();

    const request = httpMock.expectOne(
      `${BASE_API}/following?type=${type}&ids=${artistId}`
    );
    expect(request.request.method).toBe('PUT');
    request.flush(null);
  });
});
