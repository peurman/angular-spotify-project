import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as albumActions from './album.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlbumService } from 'src/app/albums/services/album.service';

@Injectable()
export class AlbumDetailEffects {
  constructor(private actions$: Actions, private albumService: AlbumService) {}

  getAlbumDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActions.getAlbumDetailAction),
      exhaustMap((res) =>
        this.albumService.getAlbumDetail(res.id).pipe(
          map((response) => {
            return albumActions.getAlbumDetailSuccessAction({
              data: response,
            });
          }),
          catchError((error) =>
            of(
              albumActions.getAlbumDetailErrorAction({
                message: `Cannot get album. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
