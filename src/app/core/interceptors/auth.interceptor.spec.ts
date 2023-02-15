import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { HttpResponse, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/login/services/auth.service';
import { ArtistinfoService } from 'src/app/artists/services/artistinfo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authService: AuthService;
  let artistinfoService: ArtistinfoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        AuthService,
        ArtistinfoService,
        provideMockStore({}),
      ],
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    interceptor = TestBed.inject(AuthInterceptor);
    artistinfoService = TestBed.inject(ArtistinfoService);
  });

  it('should add Authorization header', () => {
    const req = new HttpRequest('GET', '/test');
    const next = jasmine.createSpyObj('HttpHandler', ['handle']);
    const httpEvent = new HttpResponse();
    next.handle.and.returnValue(of(httpEvent));

    interceptor.intercept(req, next).subscribe((event) => {
      expect(event).toEqual(httpEvent);
    });
  });
});
