import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistinfoService } from './artistinfo.service';

describe('ArtistinfoService', () => {
  let service: ArtistinfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistinfoService],
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ArtistinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
