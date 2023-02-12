import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as albumDetailActions from './album.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlbumService } from 'src/app/albums/services/album.service';

@Injectable()
export class AlbumDetailEffects {
  constructor(
    private actions$: Actions,
    private albumDetailService: AlbumService
  ) {}

  getAlbumDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumDetailActions.getAlbumDetailAction),
      exhaustMap((res) =>
        this.albumDetailService.getAlbumDetail(res.id).pipe(
          map((response) => {
            return albumDetailActions.getAlbumDetailSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              albumDetailActions.getAlbumDetailErrorAction({
                message: `Cannot get albumDetail. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
