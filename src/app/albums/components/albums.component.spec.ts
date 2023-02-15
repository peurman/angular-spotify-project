import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AlbumsComponent } from './albums.component';
import { CheckerService } from 'src/app/core/services/checker.service';
import { By } from '@angular/platform-browser';
import { AlbumDetail } from '../models/albums.interface';
import {
  Artist,
  Copyright,
  Track,
} from 'src/app/search/models/search.interface';
import { Tracks } from '../../albums/models/albums.interface';
import { AlbumService } from '../services/album.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RootState } from 'src/app/store';
import * as ArtistActions from '../../store/artist/artist.actions';
import { getTrackAction } from 'src/app/store/track/track.actions';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';

const album = {
  album_type: 'album',
  artists: [
    {
      external_urls: { spotify: 'https://open.spotify.com/artist/123' },
      href: 'https://api.spotify.com/v1/artists/123',
      id: '123',
      name: 'Artist 1',
      type: 'artist',
      uri: 'spotify:artist:123',
      followers: {
        href: null,
        total: 1000,
      },
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/123',
          width: 640,
        },
      ],
    },
  ],
  available_markets: ['US', 'CA', 'GB'],
  external_urls: { spotify: 'https://open.spotify.com/album/123' },
  href: 'https://api.spotify.com/v1/albums/123',
  id: '123',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/123',
      width: 640,
    },
  ],
  name: 'Album 1',
  release_date: new Date('2020-01-01'),
  release_date_precision: 'day',
  total_tracks: 10,
  type: 'album',
  uri: 'spotify:album:123',
};
const trackObj: Track = {
  album: album,
  artists: [
    {
      external_urls: { spotify: 'https://open.spotify.com/artist/456' },
      href: 'https://api.spotify.com/v1/artists/456',
      id: '456',
      name: 'Artist 2',
      type: 'artist',
      uri: 'spotify:artist:456',
      followers: {
        href: null,
        total: 5000,
      },
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/456',
          width: 640,
        },
      ],
    },
  ],
  available_markets: ['US', 'CA'],
  disc_number: 1,
  duration_ms: 300000,
  episode: false,
  explicit: true,
  external_ids: {
    isrc: 'US-abc-12-34567',
  },
  external_urls: { spotify: 'https://open.spotify.com/track/123' },
  href: 'https://api.spotify.com/v1/tracks/123',
  id: '123',
  is_local: false,
  name: 'Track 1',
  popularity: 75,
  preview_url: 'https://p.scdn.co/mp3-preview/123',
  track: true,
  track_number: 3,
  type: 'track',
  uri: 'spotify:track:123',
  saved: true,
};

const tracks: Tracks = {
  href: 'string',
  items: [trackObj],
  limit: 2,
  next: 'string',
  offset: 2,
  previous: null,
  total: 2,
};
const copyright: Copyright = {
  text: 'string',
  type: 'string',
};
const artist: Artist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF',
  },
  href: 'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
  id: '0OdUWJ0sBjDrqHygGUXeCF',
  name: 'Radiohead',
  type: 'artist',
  uri: 'spotify:artist:0OdUWJ0sBjDrqHygGUXeCF',
  followers: {
    href: null,
    total: 4164771,
  },
  genres: [
    'alternative rock',
    'art rock',
    'melancholia',
    'modern rock',
    'permanent wave',
    'rock',
  ],
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/9acbf260996c02f71f8b2fb8b31208f7e474bdc4',
      width: 640,
    },
    {
      height: 320,
      url: 'https://i.scdn.co/image/ef85d37a86f16b428f548974e0eefcc39f53fb22',
      width: 320,
    },
    {
      height: 160,
      url: 'https://i.scdn.co/image/3da3df13c1c125aa38d684c66d507f8c2d908e08',
      width: 160,
    },
  ],
  popularity: 81,
};
const image = {
  height: 160,
  url: 'https://i.scdn.co/image/3da3df13c1c125aa38d684c66d507f8c2d908e08',
  width: 160,
};
const externalUrls = {
  spotify: 'string',
};
const externalIDS = {
  isrc: 'string',
};
const albumDetailMock: AlbumDetail = {
  album_type: 'test',
  artists: [artist],
  available_markets: ['test'],
  copyrights: [copyright],
  external_ids: externalIDS,
  external_urls: externalUrls,
  genres: ['test'],
  href: 'test',
  id: 'test',
  images: [image],
  label: 'test',
  name: 'test',
  popularity: 100,
  release_date: new Date(),
  release_date_precision: 'test',
  total_tracks: 200,
  tracks: tracks,
  type: 'test',
  uri: 'test',
};

describe('AlbumsComponent', () => {
  let store: MockStore<RootState>;
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let mockStore: MockStore;
  let httpMock: HttpTestingController;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let checkerServiceSpy: jasmine.SpyObj<CheckerService>;

  const initialState = {
    album: {
      albumDetailData: albumDetailMock,
    },
  };

  const checkerServiceStub = {
    saveRemoveAlbumFromLibrary: (id: string, save: boolean) => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'tracks', component: TracksComponent },
        ]),
      ],
      declarations: [AlbumsComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: CheckerService, useValue: checkerServiceStub },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    albumServiceSpy = TestBed.inject(
      AlbumService
    ) as jasmine.SpyObj<AlbumService>;
    checkerServiceSpy = TestBed.inject(
      CheckerService
    ) as jasmine.SpyObj<CheckerService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display album name', () => {
    component.album$ = of(albumDetailMock);
    fixture.detectChanges();
    const albumName = fixture.debugElement.query(By.css('.album__title'))
      .nativeElement.textContent;
    expect(albumName.replaceAll(' ', '')).toEqual(albumDetailMock.name);
  });

  it('should dispatch getTrackAction on goToTrack', () => {
    spyOn(component, 'goToTrack').and.callThrough();
    spyOn(store, 'dispatch');
    const artist = { id: '1' };
    fixture.detectChanges();
    component.goToTrack(artist.id);
    expect(component.goToTrack).toHaveBeenCalledWith(artist.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      getTrackAction({ id: artist.id })
    );
  });
  it('should call checkerService.saveRemoveAlbumFromLibrary when clicking on save album', () => {
    spyOn(checkerServiceStub, 'saveRemoveAlbumFromLibrary').and.returnValue(
      of({})
    );
    component.following = false;
    const albumId = '1';
    component.saveRemoveAlbum(albumId);
    expect(checkerServiceStub.saveRemoveAlbumFromLibrary).toHaveBeenCalledWith(
      albumId,
      true
    );
  });
  it('should call checkerService.saveRemoveAlbumFromLibrary when clicking on remove album', () => {
    spyOn(checkerServiceStub, 'saveRemoveAlbumFromLibrary').and.returnValue(
      of({})
    );
    component.following = true;
    const albumId = '1';
    component.saveRemoveAlbum(albumId);
    expect(checkerServiceStub.saveRemoveAlbumFromLibrary).toHaveBeenCalledWith(
      albumId,
      false
    );
  });
  // it('should update this.following on items > 0', () => {
  //   component.albumsSavedComplete =
  // })
});
