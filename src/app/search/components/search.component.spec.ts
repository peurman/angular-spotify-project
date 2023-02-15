import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AlbumsComponent } from 'src/app/albums/components/albums.component';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';
import { PlaylistsComponent } from 'src/app/playlists/components/playlists.component';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
          { path: 'albums', component: AlbumsComponent },
          { path: 'playlists', component: PlaylistsComponent },
          { path: 'tracks', component: TracksComponent },
        ]),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
