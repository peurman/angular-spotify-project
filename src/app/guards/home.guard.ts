import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { AuthToken } from '../login/models/authtoken.interface';
import { AuthService } from '../login/services/auth.service';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (tokenInfo) {
      const tokenAuth = JSON.parse(tokenInfo) as AuthToken;
      return this.auth.VerifyToken(tokenAuth.access_token).pipe(
        map(() => {
          return true;
        }),
        catchError(() => {
          this.router.navigateByUrl('/login');
          this.auth.LogOut();
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
