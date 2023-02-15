import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as recommendationsActions from './recommendations.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresService } from 'src/app/genres/services/genres.service';
import { CheckerService } from 'src/app/core/services/checker.service';

@Injectable()
export class RecommendationsEffects {
  constructor(
    private actions$: Actions,
    private recommendationsService: GenresService,
    private checkerService: CheckerService
  ) {}

  getRecommendations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recommendationsActions.getRecommendationsAction),
      exhaustMap((res) =>
        this.recommendationsService
          .getRecommendationsByGenre(res.genreName)
          .pipe(
            switchMap((response) => {
              return this.checkerService.checkSavedTracks(response.tracks).pipe(
                map((booleanResponse) => {
                  response.tracks.forEach((track, index) => {
                    const trackBooleanValue = booleanResponse[index];
                    track.saved = trackBooleanValue;
                  });
                  return recommendationsActions.getRecommendationsSuccessAction(
                    {
                      data: response,
                    }
                  );
                })
              );
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
