import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { AuthToken } from '../models/authtoken.interface';
import { AuthService } from '../services/auth.service';
import { login, logout } from '../../store/login/login.actions';

@Injectable()
export class CallbackGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}
  canActivate(childRoute: ActivatedRouteSnapshot) {
    const param = childRoute.queryParamMap.get('code');
    if (param) {
      return this.auth.GetTokenFromCode(param).pipe(
        map((token: AuthToken) => {
          this.auth.SaveToken(token);
          this.router.navigateByUrl('/home');
          return true;
        }),
        catchError(() => {
          this.router.navigateByUrl('/login');
          this.auth.LogOut();
          this.store.dispatch(logout());
          const config = new MatSnackBarConfig();
          config.panelClass = ['success-dialog'];
          config.verticalPosition = 'bottom';
          config.horizontalPosition = 'center';
          this._snackBar.open(
            'Error: The acces code provided was wrong',
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
