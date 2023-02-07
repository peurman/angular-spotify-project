import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { AuthToken } from 'src/app/login/models/authtoken.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!req.headers.has('Authorization')) {
      let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
      if (new Date() > tokenInfo.expirationDate) {
        return this.auth.RefreshToken().pipe(
          switchMap((token: AuthToken) => {
            this.auth.SaveToken(token);
            tokenInfo = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
            const authReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                `Bearer ${tokenInfo.access_token}`
              ),
            });
            return next.handle(authReq);
          })
        );
      } else {
        const authReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${tokenInfo.access_token}`
          ),
        });
        return next.handle(authReq);
      }
    } else {
      return next.handle(req);
    }
  }
}
