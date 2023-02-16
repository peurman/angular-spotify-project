import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as playlistActions from './playlist.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaylistService } from 'src/app/playlists/services/playlists.service';
import {
  Item,
  Playlist,
  Tracks,
} from 'src/app/playlists/models/playlists.interface';
import { CheckerService } from 'src/app/core/services/checker.service';
import { Track } from 'src/app/search/models/search.interface';

@Injectable()
export class PlaylistEffects {
  constructor(
    private actions$: Actions,
    private playlistService: PlaylistService,
    private checkerService: CheckerService
  ) {}

  getPlaylist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(playlistActions.getPlaylistAction),
      exhaustMap((res) =>
        this.playlistService.getPlaylist(res.id, res.url).pipe(
          map((response) => {
            let responseFixed;
            if ('tracks' in response) {
              responseFixed = response as Playlist;
              return playlistActions.getPlaylistSuccessAction({
                data: responseFixed,
              });
            } else {
              responseFixed = response as Tracks;
              return playlistActions.updatePlaylistsTracks({
                data: responseFixed,
              });
            }
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
