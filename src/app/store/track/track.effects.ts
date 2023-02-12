import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TrackService } from 'src/app/tracks/services/track.service';
import * as trackActions from './track.actions';

@Injectable()
export class TrackEffects {
  constructor(private actions$: Actions, private trackService: TrackService) {}

  getTrack = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.getTrackAction),
      switchMap((action) => {
        return this.trackService.getTrackInfo(action.id).pipe(
          map((track) => {
            return trackActions.getTrackSuccessAction({
              track: track,
            });
          }),
          catchError((error) =>
            of(
              trackActions.getTrackErrorAction({
                message: error,
              })
            )
          )
        );
      })
    );
  });
}
