import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TopItems } from 'src/app/profile/services/topitems.service';
import * as profileActions from './profile.actions';
@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private topService: TopItems) {}

  getTopArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getTopArtistsAction),
      switchMap((res) => {
        return this.topService.getTopArtists(res.url).pipe(
          switchMap((response) => {
            return this.topService.checkFollowing(response.items).pipe(
              map((res) => {
                response.items.forEach((artist, index) => {
                  const artistValue = res[index];
                  if (artistValue) {
                    artist.isFollowing = true;
                  } else {
                    artist.isFollowing = false;
                  }
                });
                return profileActions.getTopArtistsSuccessAction({
                  data: response,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              profileActions.getTopArtistsErrorAction({
                message: `Cannot get top artists. Error: ${error.message}`,
              })
            )
          )
        );
      })
    );
  });
  getTopTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getTopTracksAction),
      switchMap((res) => {
        return this.topService.getTopTracks(res.url).pipe(
          map((response) => {
            return profileActions.getTopTracksSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              profileActions.getTopArtistsErrorAction({
                message: `Cannot get top tracks. Error: ${error.message}`,
              })
            )
          )
        );
      })
    );
  });
  unfollow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.unFollowArtistsAction),
      switchMap((res) => {
        return this.topService
          .followUnfollowArtist(false, 'artist', res.id)
          .pipe(
            map(() => {
              return profileActions.unFollowArtistsSuccessAction({
                id: res.id,
              });
            }),
            catchError((error) =>
              of(
                profileActions.unFollowArtistsErrorAction({
                  message: `Cannot unfollow the user. Error: ${error.message}`,
                })
              )
            )
          );
      })
    );
  });
  follow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.followArtistsAction),
      switchMap((res) => {
        return this.topService
          .followUnfollowArtist(true, 'artist', res.id)
          .pipe(
            map(() => {
              return profileActions.followArtistsSuccessAction({
                id: res.id,
              });
            }),
            catchError((error) =>
              of(
                profileActions.followArtistsErrorAction({
                  message: `Cannot unfollow the user. Error: ${error.message}`,
                })
              )
            )
          );
      })
    );
  });
}
