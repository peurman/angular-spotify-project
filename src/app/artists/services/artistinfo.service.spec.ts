import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ArtistinfoService } from './artistinfo.service';
import { RelatedArtist } from '../models/topartistracks.interface';
import { Artist, ArtistType } from 'src/app/home/models/new-releases.interface';
import { Albums } from 'src/app/search/models/search.interface';

describe('ArtistinfoService', () => {
  let service: ArtistinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistinfoService],
    });
    service = TestBed.inject(ArtistinfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get artist info from API', () => {
    const id = '123';
    const artistMock: Artist = {
      id: '123',
      name: 'Test Artist',
      external_urls: {
        spotify: 'https://open.spotify.com/artist/123',
      },
      images: [],
      followers: {
        href: null,
        total: 1000,
      },
      type: ArtistType.Artist,
      uri: 'spotify:artist:123',
      isFollowing: false,
      href: 'string',
    };

    service.getArtistInfo(id).subscribe((artist: Artist) => {
      expect(artist).toEqual(artistMock);
    });

    const req = httpMock.expectOne(`https://api.spotify.com/v1/artists/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(artistMock);
  });

  it('should get artist albums from API', () => {
    const id = '123';
    const url = null;
    const albumsMock: Albums = {
      href: 'https://api.spotify.com/v1/artists/123/albums?offset=0&limit=9&include_groups=album,single,compilation,appears_on',
      items: [],
      limit: 9,
      next: 'string',
      offset: 0,
      previous: null,
      total: 0,
    };

    service.getArtistAlbums(id, url).subscribe((albums: Albums) => {
      expect(albums).toEqual(albumsMock);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${id}/albums?limit=9`,
    });
    expect(req.request.method).toBe('GET');
    req.flush(albumsMock);
  });

  it('should get artist albums from API with URL', () => {
    const id = '123';
    const url = 'https://api.spotify.com/v1/artists/${id}/albums?limit=9';
    const albumsMock: Albums = {
      href: 'https://api.spotify.com/v1/artists/123/albums?offset=0&limit=9&include_groups=album,single,compilation,appears_on',
      items: [],
      limit: 9,
      next: 'string',
      offset: 0,
      previous: null,
      total: 0,
    };

    service.getArtistAlbums(id, url).subscribe((albums: Albums) => {
      expect(albums).toEqual(albumsMock);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: 'https://api.spotify.com/v1/artists/${id}/albums?limit=9',
    });
    expect(req.request.method).toBe('GET');
    req.flush(albumsMock);
  });

  it('should get artist top tracks from API', () => {
    const id = '123';
    const artistTracksMock = {
      tracks: [],
    };

    service.getArtistTopTracks(id).subscribe((artistTracks) => {
      expect(artistTracks).toEqual(artistTracksMock);
    });

    const req = httpMock.expectOne(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`
    );
    expect(req.request.method).toBe('GET');
    req.flush(artistTracksMock);
  });

  it('should get suggested artists from API', () => {
    const id = '123';
    const relatedArtistMock: RelatedArtist = {
      artists: [],
    };

    service.getSuggestedArtist(id).subscribe((relatedArtist) => {
      expect(relatedArtist).toEqual(relatedArtistMock);
    });

    const req = httpMock.expectOne(
      `https://api.spotify.com/v1/artists/${id}/related-artists`
    );
    expect(req.request.method).toBe('GET');
    req.flush(relatedArtistMock);
  });
});
