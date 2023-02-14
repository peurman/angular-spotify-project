import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as recommendationsActions from './recommendations.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresService } from 'src/app/genres/services/genres.service';

@Injectable()
export class RecommendationsEffects {
  constructor(
    private actions$: Actions,
    private recommendationsService: GenresService
  ) {}

  getRecommendations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recommendationsActions.getRecommendationsAction),
      exhaustMap((res) =>
        this.recommendationsService
          .getRecommendationsByGenre(res.genreName)
          .pipe(
            map((response) => {
              return recommendationsActions.getRecommendationsSuccessAction({
                data: response,
              });
            }),
            catchError((error) =>
              of(
                recommendationsActions.getRecommendationsErrorAction({
                  message: `Cannot get recommendations. Error: ${error.message}`,
                })
              )
            )
          )
      )
    );
  });
}
