import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import * as loginActions from './login.actions';
import { User } from './login.state';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  getUserRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.getUserRequest),
      exhaustMap(() =>
        this.authService.GetUserName().pipe(
          map((user: User) => {
            const result = (({ display_name, followers, images }) => ({
              display_name,
              followers,
              images,
            }))(user);
            return loginActions.login({
              user: result,
            });
          })
        )
      )
    );
  });
}
