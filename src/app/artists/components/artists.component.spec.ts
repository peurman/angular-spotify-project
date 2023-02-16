import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RootState } from 'src/app/store';
import * as ArtistActions from '../../store/artist/artist.actions';
import { ArtistsComponent } from './artists.component';
import * as fromArtist from '../../store/artist/artist.selectors';
import {
  Album,
  Artist,
  ArtistType,
  ExternalUrls,
  Image,
} from 'src/app/home/models/new-releases.interface';
import {
  followArtistsAction,
  unFollowArtistsAction,
} from 'src/app/store/profile/profile.actions';
import {
  getAlbumDetailAction,
  saveRemoveAlbumAction,
} from 'src/app/store/album/album.actions';
import {
  getTrackAction,
  SaveRemoveTrackAction,
} from 'src/app/store/track/track.actions';
import { Track } from 'src/app/profile/model/toptracks.interface';
import { Followers } from 'src/app/search/models/search.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';
import { AlbumsComponent } from 'src/app/albums/components/albums.component';
describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
  let store: MockStore<RootState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'tracks', component: TracksComponent },
          { path: 'albums', component: AlbumsComponent },
        ]),
      ],
      declarations: [ArtistsComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getArtistAlbumsAction with previous url', () => {
    spyOn(component, 'goToPreviousAlbums').and.callThrough();
    spyOn(store, 'dispatch');
    const url = 'http://previous.albums.url';
    component.ArtistsAlbumsPrevious = url;
    component.id = '1';
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'));
    button[0].nativeElement.click();
    expect(component.goToPreviousAlbums).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      ArtistActions.getArtistAlbumsAction({ id: component.id, url })
    );
  });
  it('should dispatch getArtistAlbumsAction with next url', () => {
    spyOn(component, 'goToNextAlbums').and.callThrough();
    spyOn(store, 'dispatch');
    const url = 'http://next.albums.url';
    component.ArtistsAlbumsNext = url;
    component.id = '1';
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'));
    button[1].triggerEventHandler('click', null);
    expect(component.goToNextAlbums).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      ArtistActions.getArtistAlbumsAction({ id: component.id, url })
    );
  });
  it('should dispatch unFollowArtistsAction if artist is already followed', () => {
    spyOn(component, 'handleFollowClick').and.callThrough();
    spyOn(store, 'dispatch');
    const image = {
      height: 1,
      url: 'test',
      width: 1,
    } as Image;
    const externalUrls = {
      spotify: 'testing',
    };
    const artistType = {
      Artist: 'artist',
    } as unknown as ArtistType;
    const followers = {
      href: null,
      total: 2,
    };
    const artist: Artist = {
      images: [image],
      external_urls: externalUrls,
      href: 'test',
      id: '1',
      name: 'test',
      type: artistType,
      uri: 'teest',
      isFollowing: true,
      followers: followers,
      genres: ['test'],
      popularity: 1,
    };
    component.id = artist.id;
    store.overrideSelector(fromArtist.selectArtistData, artist);
    const button = fixture.debugElement.query(By.css('a'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.handleFollowClick).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      unFollowArtistsAction({ id: artist.id })
    );
  });
  it('should dispatch FollowArtistsAction if artist is not followed', () => {
    spyOn(component, 'handleFollowClick').and.callThrough();
    spyOn(store, 'dispatch');
    const image = {
      height: 1,
      url: 'test',
      width: 1,
    } as Image;
    const externalUrls = {
      spotify: 'testing',
    };
    const artistType = {
      Artist: 'artist',
    } as unknown as ArtistType;
    const followers = {
      href: null,
      total: 2,
    };
    const artist: Artist = {
      images: [image],
      external_urls: externalUrls,
      href: 'test',
      id: '1',
      name: 'test',
      type: artistType,
      uri: 'teest',
      isFollowing: false,
      followers: followers,
      genres: ['test'],
      popularity: 1,
    };
    component.id = artist.id;
    store.overrideSelector(fromArtist.selectArtistData, artist);
    const button = fixture.debugElement.query(By.css('a'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.handleFollowClick).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      followArtistsAction({ id: artist.id })
    );
  });
  it('should dispatch saveRemoveAlbumAction with correct arguments', () => {
    spyOn(component, 'SaveRemoveAlbum').and.callThrough();
    spyOn(store, 'dispatch');
    const album = { id: '1', name: 'Album 1', saved: true };
    fixture.detectChanges();
    component.SaveRemoveAlbum(album.id, album.saved);
    expect(component.SaveRemoveAlbum).toHaveBeenCalledWith(
      album.id,
      album.saved
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      saveRemoveAlbumAction({ id: album.id, save: false })
    );
  });
  it('should dispatch saveRemoveTrackAction with correct arguments', () => {
    spyOn(component, 'SaveRemoveTrack').and.callThrough();
    spyOn(store, 'dispatch');
    const externalUrls: ExternalUrls = {
      spotify: 'string',
    };
    const images: Image[] = [
      {
        height: 120,
        url: 'string',
        width: 120,
      },
    ];
    const followers: Followers = {
      href: null,
      total: 120,
    };
    const artists: Artist[] = [
      {
        images: images,
        external_urls: externalUrls,
        href: 'string',
        id: 'string',
        name: 'string',
        type: ArtistType.Artist,
        uri: 'string',
        isFollowing: false,
        followers: followers,
        genres: ['string'],
        popularity: 2,
      },
    ];
    const album: Album = {
      album_type: 'string',
      artists: artists,
      available_markets: ['string'],
      external_urls: externalUrls,
      href: 'string',
      id: 'string',
      images: images,
      name: 'string',
      release_date: new Date(),
      release_date_precision: 'string',
      total_tracks: 2,
      type: 'string',
      uri: 'string',
    };
    const track: Track = {
      album: album,
      name: 'test',
      preview_url: 'test',
      duration_ms: 2,
      type: 'test',
      saved: false,
      id: '1',
    };
    fixture.detectChanges();
    component.SaveRemoveTrack(track.id, !track.saved);
    expect(component.SaveRemoveTrack).toHaveBeenCalledWith(track.id, true);
    expect(store.dispatch).toHaveBeenCalledWith(
      SaveRemoveTrackAction({ id: track.id, save: false })
    );
  });
  it('should dispatch getArtistAction on handleArtistClick', () => {
    spyOn(component, 'handleArtistClick').and.callThrough();
    spyOn(store, 'dispatch');
    const artist = { id: '1' };
    fixture.detectChanges();
    component.handleArtistClick(artist.id);
    expect(component.handleArtistClick).toHaveBeenCalledWith(artist.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      ArtistActions.getArtistAction({ id: artist.id })
    );
  });
  it('should dispatch getTrackAction on goToTrack', () => {
    spyOn(component, 'goToTrack').and.callThrough();
    spyOn(store, 'dispatch');
    const track = { id: '1' };
    fixture.detectChanges();
    component.goToTrack(track.id);
    expect(component.goToTrack).toHaveBeenCalledWith(track.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      getTrackAction({ id: track.id })
    );
  });
  it('should dispatch getArtistAction on goToArtist', () => {
    spyOn(component, 'goToArtist').and.callThrough();
    spyOn(store, 'dispatch');
    const artist = { id: '1' };
    fixture.detectChanges();
    component.goToArtist(artist.id);
    expect(component.goToArtist).toHaveBeenCalledWith(artist.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      ArtistActions.getArtistAction({ id: artist.id })
    );
  });
  it('should dispatch getAlbumDetailAction on goToAlbum', () => {
    spyOn(component, 'goToAlbum').and.callThrough();
    spyOn(store, 'dispatch');
    const album = { id: '1' };
    fixture.detectChanges();
    component.goToAlbum(album.id);
    expect(component.goToAlbum).toHaveBeenCalledWith(album.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      getAlbumDetailAction({ id: album.id })
    );
  });
});
