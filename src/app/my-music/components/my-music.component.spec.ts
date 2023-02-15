import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CheckerService } from 'src/app/core/services/checker.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MyMusicComponent } from './my-music.component';
import { TrackService } from 'src/app/tracks/services/track.service';

describe('MyMusicComponent', () => {
  let component: MyMusicComponent;
  let fixture: ComponentFixture<MyMusicComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyMusicComponent],
      providers: [provideMockStore({}), CheckerService, TrackService],
      imports: [HttpClientTestingModule],
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
