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
    'BQDF_gvJPLRWkJSgE_aubMlZfF0WXt2PlNyuFgc0lAFqB3y5_pgqnWAUBZCUR-JTCS6vdzz7Jtt7KyDN1-hm-Yp6AoL7aoumByoc26DnwmB3PfKrNYwe';

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
