import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as genresActions from './genres.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainService } from 'src/app/home/services/main.service';

@Injectable()
export class GenresEffects {
  constructor(private actions$: Actions, private genresService: MainService) {}

  getGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(genresActions.getGenresAction),
      exhaustMap((res) =>
        this.genresService.getGenres(res.url).pipe(
          map((response) => {
            return genresActions.getGenresSuccessAction({
              data: response.genres,
            });
          }),
          catchError((error) =>
            of(
              genresActions.getGenresErrorAction({
                message: `Cannot get genres. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
