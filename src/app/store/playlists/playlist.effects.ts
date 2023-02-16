import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as playlistActions from './playlist.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
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
          switchMap((response) => {
            if ('tracks' in response) {
              const responsePlaylist = response as Playlist;
              const test: Track[] = [];
              response.tracks.items?.forEach((item) => {
                test.push(item.track);
              });
              return this.checkerService.checkSavedTracks(test).pipe(
                map((booleanResponse) => {
                  console.log('bool', booleanResponse);
                  response.tracks.items?.forEach((track, index) => {
                    const booleanValue = booleanResponse[index];
                    track.track.saved = booleanValue;
                  });
                  return playlistActions.getPlaylistSuccessAction({
                    data: responsePlaylist,
                  });
                })
              );
            } else {
              const responsePlaylist = response as Tracks;
              return of(
                playlistActions.updatePlaylistsTracks({
                  data: responsePlaylist,
                })
              );
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
