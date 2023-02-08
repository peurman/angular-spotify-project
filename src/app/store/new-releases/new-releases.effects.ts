import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as newReleasesActions from './new-releases.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainService } from 'src/app/home/services/main.service';

@Injectable()
export class NewReleasesEffects {
  constructor(
    private actions$: Actions,
    private newReleasesService: MainService
  ) {}

  getNewReleases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newReleasesActions.getNewReleasesAction),
      exhaustMap((res) =>
        this.newReleasesService.getNewReleases(res.url).pipe(
          map((response) => {
            return newReleasesActions.getNewReleasesSuccessAction({
              data: response.albums,
            });
          }),
          catchError((error) =>
            of(
              newReleasesActions.getNewReleasesErrorAction({
                message: `Cannot get new releases. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
