import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';
import { PlayListCategory } from '../models/playlist.interface';
import { playlist } from './helpers/categories.mocks';
const BASE_API = 'https://api.spotify.com/v1/';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService],
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of playlists', () => {
    const id = '1';
    const mockPlaylists: PlayListCategory = {
      playlists: {
        href: '',
        items: [playlist],
        limit: 10,
        next: '',
        offset: 0,
        previous: 'test',
        total: 2,
      },
    };
    const url =
      'https://api.spotify.com/v1/browse/categories/1/playlists?limit=10';

    service.getCategoriesPlayLists(id, url).subscribe((data) => {
      expect(data.playlists.items.length).toBe(1);
      expect(data.playlists.items[0].name).toBe('Best Jazz Tracks');
    });

    const req = httpMock.expectOne(
      `${BASE_API}browse/categories/${id}/playlists?limit=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  });

  it('should return a list of playlists from a URL', () => {
    const id = '1';
    const mockPlaylists: PlayListCategory = {
      playlists: {
        href: '',
        items: [playlist],
        limit: 10,
        next: '',
        offset: 0,
        previous: 'test',
        total: 2,
      },
    };
    const url = 'https://api.spotify.com/v1/browse/categories/1/playlists';

    service.getCategoriesPlayLists(id, url).subscribe((data) => {
      expect(data.playlists.items.length).toBe(1);
      expect(data.playlists.items[0].name).toBe('Best Jazz Tracks');
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  });
  it('should return a list of playlists without a URL', () => {
    const id = '1';
    const mockPlaylists: PlayListCategory = {
      playlists: {
        href: '',
        items: [playlist],
        limit: 10,
        next: '',
        offset: 0,
        previous: 'test',
        total: 2,
      },
    };
    const url = '';

    service.getCategoriesPlayLists(id, url).subscribe((data) => {
      expect(data.playlists.items.length).toBe(1);
      expect(data.playlists.items[0].name).toBe('Best Jazz Tracks');
    });

    const req = httpMock.expectOne(
      'https://api.spotify.com/v1/browse/categories/1/playlists?limit=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  });
});
