import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RootState } from 'src/app/store';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import {
  getTopArtistsAction,
  getTopTracksAction,
} from 'src/app/store/profile/profile.actions';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch getArtistAction on handleArtistClick', () => {
    spyOn(component, 'handleArtistClick').and.callThrough();
    spyOn(store, 'dispatch');
    component.handleArtistClick('test-artist');
    expect(store.dispatch).toHaveBeenCalledWith(
      getArtistAction({
        id: 'test-artist',
      })
    );
  });
  it('should dispatch getTopArtistsAction on handlePreviousArtist', () => {
    spyOn(component, 'handlePreviousArtist').and.callThrough();
    spyOn(store, 'dispatch');
    component.topArtistsPrevious = 'test';
    fixture.detectChanges();
    component.handlePreviousArtist();
    expect(store.dispatch).toHaveBeenCalledWith(
      getTopArtistsAction({
        url: 'test',
      })
    );
  });
  it('should dispatch getTopArtistsAction on handleNextArtist', () => {
    spyOn(component, 'handleNextArtist').and.callThrough();
    spyOn(store, 'dispatch');
    component.topArtistsNext = 'test-next';
    fixture.detectChanges();
    component.handleNextArtist();
    expect(store.dispatch).toHaveBeenCalledWith(
      getTopArtistsAction({
        url: 'test-next',
      })
    );
  });
  it('should dispatch getTopTracksAction on handlePreviousTrack', () => {
    spyOn(component, 'handlePreviousTrack').and.callThrough();
    spyOn(store, 'dispatch');
    component.topTracksPrevious = 'test-previous';
    fixture.detectChanges();
    component.handlePreviousTrack();
    expect(store.dispatch).toHaveBeenCalledWith(
      getTopTracksAction({
        url: 'test-previous',
      })
    );
  });
  it('should dispatch getTopTracksAction on handleNextTrack', () => {
    spyOn(component, 'handleNextTrack').and.callThrough();
    spyOn(store, 'dispatch');
    component.topTracksNext = 'test-next';
    fixture.detectChanges();
    component.handleNextTrack();
    expect(store.dispatch).toHaveBeenCalledWith(
      getTopTracksAction({
        url: 'test-next',
      })
    );
  });
});
