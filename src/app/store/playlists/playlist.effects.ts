import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as playlistActions from './playlist.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaylistService } from 'src/app/playlists/services/playlists.service';

@Injectable()
export class PlaylistEffects {
  constructor(
    private actions$: Actions,
    private playlistService: PlaylistService
  ) {}

  getPlaylist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(playlistActions.getPlaylistAction),
      exhaustMap((res) =>
        this.playlistService.getPlaylist(res.id).pipe(
          map((response) => {
            return playlistActions.getPlaylistSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              playlistActions.getPlaylistErrorAction({
                message: `Cannot get playlist. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
