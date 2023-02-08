import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { AuthToken } from '../login/models/authtoken.interface';
import { AuthService } from '../login/services/auth.service';
import { getUserRequest, login, logout } from '../store/login/login.actions';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}
  canActivate() {
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (tokenInfo) {
      const tokenAuth = JSON.parse(tokenInfo) as AuthToken;
      return this.auth.VerifyToken(tokenAuth.access_token).pipe(
        map(() => {
          this.store.dispatch(getUserRequest());
          return true;
        }),
        catchError(() => {
          this.router.navigateByUrl('/login');
          this.store.dispatch(logout());
          this.auth.LogOut();
          const config = new MatSnackBarConfig();
          config.panelClass = ['success-dialog'];
          config.verticalPosition = 'bottom';
          config.horizontalPosition = 'center';
          this._snackBar.open(
            'Error: You are not registered as a developer ',
            'Ok',
            config
          );
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
