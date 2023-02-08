import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import * as loginActions from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  getUserRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginActions.getUserRequest),
      exhaustMap(() =>
        this.authService.GetUserName().pipe(
          map(({ display_name, followers, images }) => {
            const user = { display_name, followers, images };
            return loginActions.login({ user });
          })
        )
      )
    );
  });
}
