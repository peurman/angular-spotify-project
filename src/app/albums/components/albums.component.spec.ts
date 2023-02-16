import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AlbumsComponent } from './albums.component';
import { CheckerService } from 'src/app/core/services/checker.service';
import { By } from '@angular/platform-browser';
import { AlbumService } from '../services/album.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RootState } from 'src/app/store';
import { getTrackAction } from 'src/app/store/track/track.actions';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';
import { albumDetailMock } from './helpers/albums.mocks';

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
