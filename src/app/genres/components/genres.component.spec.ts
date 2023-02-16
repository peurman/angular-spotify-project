import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';
import { TracksComponent } from 'src/app/tracks/components/tracks.component';

import { GenresComponent } from './genres.component';

describe('GenresComponent', () => {
  let component: GenresComponent;
  let fixture: ComponentFixture<GenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenresComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
          { path: 'tracks', component: TracksComponent },
        ]),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(GenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
