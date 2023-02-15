import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FollowingComponent } from './following.component';
import { CheckerService } from 'src/app/core/services/checker.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';
import { PlaylistsComponent } from 'src/app/playlists/components/playlists.component';

describe('FollowingComponent', () => {
  let component: FollowingComponent;
  let fixture: ComponentFixture<FollowingComponent>;
  let httpMock: HttpTestingController;
  let checkerService: CheckerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
          { path: 'playlists', component: PlaylistsComponent },
        ]),
      ],
      declarations: [FollowingComponent],
      providers: [provideMockStore({}), CheckerService],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowingComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    checkerService = TestBed.inject(CheckerService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
