import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArtistinfoService } from 'src/app/artists/services/artistinfo.service';
import * as artistActions from './artist.actions';

@Injectable()
export class ArtistEffects {
  constructor(
    private actions$: Actions,
    private artistService: ArtistinfoService
  ) {}

  getArtistInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistAction),
      switchMap((res) =>
        this.artistService.getArtistInfo(res.id).pipe(
          map((response) => {
            return artistActions.getArtistSucessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              artistActions.getArtistErrorAction({
                message: `Cannot get categories. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
