import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { AuthToken } from 'src/app/login/models/authtoken.interface';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const skipIntercept = req.headers.has('skip');
    if (!skipIntercept) {
      if (!req.headers.has('Authorization')) {
        let tokenInfo = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
        if (Date.now() > tokenInfo.expirationDate) {
          console.log('token expired');
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
              return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                  if (error.status == 403) {
                    alert('this one');
                  }
                  return throwError(() => error);
                })
              );
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
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 403) {
              alert('this one 3');
            }
            return throwError(() => error);
          })
        );
      }
    } else {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(req);
    }
  }
}
