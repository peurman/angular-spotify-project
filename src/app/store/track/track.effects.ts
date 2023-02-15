import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CheckerService } from 'src/app/core/services/checker.service';
import { TopItems } from 'src/app/profile/services/topitems.service';
import { Track } from 'src/app/search/models/search.interface';
import { TrackService } from 'src/app/tracks/services/track.service';
import * as trackActions from './track.actions';

@Injectable()
export class TrackEffects {
  constructor(
    private actions$: Actions,
    private trackService: TrackService,
    private topService: TopItems,
    private checkerService: CheckerService
  ) {}

  getTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.getTrackAction),
      switchMap((action) => {
        return this.trackService.getTrackInfo(action.id).pipe(
          switchMap((track) => {
            const trackFixed = { ...track } as unknown as Track;
            return this.checkerService.checkSavedTracks([trackFixed]).pipe(
              map((booleanResponse) => {
                track.saved = booleanResponse[0];
                return trackActions.getTrackSuccessAction({
                  track: track,
                });
              })
            );
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

  saveRemoveTrack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(trackActions.SaveRemoveTrackAction),
      switchMap((action) => {
        return this.trackService.saveRemoveTrack(action.id, action.save).pipe(
          map(() => {
            return trackActions.SaveRemoveTrackSuccessAction({ id: action.id });
          })
        );
      }),
      catchError((error) => {
        return of(
          trackActions.SaveRemoveTrackErrorAction({
            message: error,
          })
        );
      })
    );
  });
}
