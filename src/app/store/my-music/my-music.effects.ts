import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as myMusicActions from './my-music.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MyMusicService } from 'src/app/my-music/services/my-music.service';

@Injectable()
export class MyMusicEffects {
  constructor(
    private actions$: Actions,
    private myMusicService: MyMusicService
  ) {}

  getMyPlaylists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(myMusicActions.getMyPlaylistsAction),
      exhaustMap((res) =>
        this.myMusicService.getPlaylistsSaved(res.url).pipe(
          map((response) => {
            return myMusicActions.getMyPlaylistsSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              myMusicActions.getMyPlaylistsErrorAction({
                message: `Cannot get your playlists. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getMyArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(myMusicActions.getMyArtistsAction),
      exhaustMap((res) =>
        this.myMusicService.getArtistsFollowed(res.url).pipe(
          map((response) => {
            return myMusicActions.getMyArtistsSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              myMusicActions.getMyArtistsErrorAction({
                message: `Cannot get your artists. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getMyAlbums$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(myMusicActions.getMyAlbumsAction),
      exhaustMap((res) =>
        this.myMusicService.getAlbumsSaved(res.url).pipe(
          map((response) => {
            return myMusicActions.getMyAlbumsSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              myMusicActions.getMyAlbumsErrorAction({
                message: `Cannot get your albums. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getMyTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(myMusicActions.getMyTracksAction),
      exhaustMap((res) =>
        this.myMusicService.getTracksSaved(res.url).pipe(
          map((response) => {
            return myMusicActions.getMyTracksSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              myMusicActions.getMyTracksErrorAction({
                message: `Cannot get your tracks. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
