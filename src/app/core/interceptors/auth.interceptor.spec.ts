import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { HttpResponse, HttpRequest } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add Authorization header', () => {
    const req = new HttpRequest('GET', '/test');
    const next = jasmine.createSpyObj('HttpHandler', ['handle']);
    const httpEvent = new HttpResponse();
    next.handle.and.returnValue(of(httpEvent));

    interceptor.intercept(req, next).subscribe(event => {
      expect(event).toEqual(httpEvent);
    });
  });
});
