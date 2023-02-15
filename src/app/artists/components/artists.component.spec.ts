import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RootState } from 'src/app/store';
import { getArtistAlbumsAction } from 'src/app/store/artist/artist.actions';
import * as ArtistActions from '../../store/artist/artist.actions';
import { ArtistsComponent } from './artists.component';
import * as fromArtist from '../../store/artist/artist.selectors';
import {
  Artist,
  ArtistType,
  Image,
} from 'src/app/home/models/new-releases.interface';
import {
  followArtistsAction,
  unFollowArtistsAction,
} from 'src/app/store/profile/profile.actions';
import { saveRemoveAlbumAction } from 'src/app/store/album/album.actions';
describe('ArtistsComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
  let store: MockStore<RootState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
