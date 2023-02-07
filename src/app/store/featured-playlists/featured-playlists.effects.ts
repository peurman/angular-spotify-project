import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featuredPlaylistsActions from './featured-playlists.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainService } from 'src/app/home/services/main.service';

@Injectable()
export class FeaturedPlaylistsEffects {
  constructor(
    private actions$: Actions,
    private featuredPlaylistsService: MainService
  ) {}

  getNewReleases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(featuredPlaylistsActions.getFeaturedPlaylistsAction),
      exhaustMap(() =>
        this.featuredPlaylistsService.getFeaturedPlaylists().pipe(
          map((response) => {
            return featuredPlaylistsActions.getFeaturedPlaylistsSuccessAction({
              data: response.playlists,
            });
          }),
          catchError((error) =>
            of(
              featuredPlaylistsActions.getFeaturedPlaylistsErrorAction({
                message: `Cannot get new releases. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
