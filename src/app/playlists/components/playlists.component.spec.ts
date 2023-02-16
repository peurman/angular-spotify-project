import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlaylistsComponent } from './playlists.component';
import { RootState } from 'src/app/store';
import { getRecommendationsAction } from 'src/app/store/recommendations/recommendations.actions';
import { getTrackAction } from 'src/app/store/track/track.actions';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';
import { PlaylistService } from '../services/playlists.service';

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;
  let httpMock: HttpTestingController;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsComponent],
      providers: [
        provideMockStore({}),
        { provide: PlaylistService, useValue: {} },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
          { path: 'tracks', component: TracksComponent },
        ]),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getTrackAction on goToTrack', () => {
    spyOn(component, 'goToTrack').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToTrack('testTrack');
    expect(store.dispatch).toHaveBeenCalledWith(
      getTrackAction({
        id: 'testTrack',
      })
    );
  });
  it('should dispatch getArtistAction on goToArtist', () => {
    spyOn(component, 'goToArtist').and.callThrough();
    spyOn(store, 'dispatch');
    component.goToArtist('testArtist');
    expect(store.dispatch).toHaveBeenCalledWith(
      getArtistAction({
        id: 'testArtist',
      })
    );
  });
});
