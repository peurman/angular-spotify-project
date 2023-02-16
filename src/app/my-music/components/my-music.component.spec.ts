import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CheckerService } from 'src/app/core/services/checker.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MyMusicComponent } from './my-music.component';
import { TrackService } from 'src/app/tracks/services/track.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';
import { AlbumsComponent } from 'src/app/albums/components/albums.component';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';

describe('MyMusicComponent', () => {
  let component: MyMusicComponent;
  let fixture: ComponentFixture<MyMusicComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyMusicComponent],
      providers: [provideMockStore({}), CheckerService, TrackService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
          { path: 'albums', component: AlbumsComponent },
          { path: 'tracks', component: TracksComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyMusicComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
