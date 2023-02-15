import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ArtistsComponent } from 'src/app/artists/components/artists.component';

import { TracksComponent } from './tracks.component';

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksComponent],
      providers: [provideMockStore({})],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'artists', component: ArtistsComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
