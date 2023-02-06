import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // token = localStorage.getItem('user.token');
  token =
    'BQBP_JHe5I6cVuysFi9TjBdWaDOWbrDXDIw96-UZjQGK0u6gIGWgWDQH6xGCDEn3MFHpR6EAYF353QL_d87Ajdl6RL6Uj8GE0Lyumhfzz4kaYbdfrV48';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });
    return next.handle(authReq);
  }
}
