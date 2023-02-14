import { TestBed } from '@angular/core/testing';

import { ArtistinfoService } from './artistinfo.service';

describe('ArtistinfoService', () => {
  let service: ArtistinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
