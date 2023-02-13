import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArtistinfoService } from 'src/app/artists/services/artistinfo.service';
import { TopItems } from 'src/app/profile/services/topitems.service';
import * as artistActions from './artist.actions';

@Injectable()
export class ArtistEffects {
  constructor(
    private actions$: Actions,
    private artistService: ArtistinfoService,
    private topService: TopItems
  ) {}

  getArtistInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistAction),
      switchMap((res) =>
        this.artistService.getArtistInfo(res.id).pipe(
          switchMap((response) => {
            return this.topService.checkFollowing([response]).pipe(
              map((followingResponse) => {
                response.isFollowing = followingResponse[0];
                return artistActions.getArtistSucessAction({
                  data: response,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              artistActions.getArtistErrorAction({
                message: `Cannot get artist. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getArtistAlbums = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistAlbumsAction),
      switchMap((res) =>
        this.artistService.getArtistAlbums(res.id, res.url).pipe(
          map((response) => {
            return artistActions.getArtistAlbumsSucessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              artistActions.getArtistAlbumsErrorAction({
                message: `Cannot get albums. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
