import { inject, TestBed } from '@angular/core/testing';
import { CheckerService } from './checker.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CheckerService', () => {
  let service: CheckerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckerService],
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CheckerService);
  });

  it('should be created', inject(
    [CheckerService],
    (service: CheckerService) => {
      expect(service).toBeTruthy();
    }
  ));
});
