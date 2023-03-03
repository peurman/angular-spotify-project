import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as albumActions from './album.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { AlbumService } from 'src/app/albums/services/album.service';
import { CheckerService } from 'src/app/core/services/checker.service';

@Injectable()
export class AlbumDetailEffects {
  constructor(
    private actions$: Actions,
    private checkerService: CheckerService,
    private albumService: AlbumService
  ) {}

  getAlbumDetail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActions.getAlbumDetailAction),
      exhaustMap((res) =>
        this.albumService.getAlbumDetail(res.id).pipe(
          switchMap((response) => {
            return this.checkerService
              .checkSavedTracks(response.tracks.items)
              .pipe(
                map((booleanResponse) => {
                  response.tracks.items.forEach((track, index) => {
                    const booleanValue = booleanResponse[index];
                    track.saved = booleanValue;
                  });
                  return albumActions.getAlbumDetailSuccessAction({
                    data: response,
                  });
                })
              );
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
  saveRemoveAlbum = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActions.saveRemoveAlbumAction),
      exhaustMap((res) => {
        return this.checkerService
          .saveRemoveAlbumFromLibrary(res.id, res.save)
          .pipe(
            map(() => {
              if (res.save) {
                Swal.fire({
                  title: 'Album successfully saved!',
                  timer: 1500,
                  position: 'top-right',
                  icon: 'success',
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              } else {
                Swal.fire({
                  title: 'Album successfully removed!',
                  timer: 1500,
                  position: 'top-right',
                  icon: 'success',
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              }
              return albumActions.saveRemoveAlbumSuccessAction({
                id: res.id,
              });
            }),
            catchError((error) =>
              of(
                albumActions.saveRemoveAlbumErrorAction({
                  message: `Cannot save/remove album. Error: ${error.message}`,
                })
              )
            )
          );
      })
    );
  });
}
