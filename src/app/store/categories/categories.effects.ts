import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as categoriesActions from './categories.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainService } from 'src/app/home/services/main.service';
import { CategoriesService } from 'src/app/categories/services/categories.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private categoriesService: CategoriesService
  ) {}

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(categoriesActions.getCategoriesAction),
      exhaustMap((res) =>
        this.mainService.getCategories(res.url).pipe(
          map((response) => {
            return categoriesActions.getCategoriesSuccessAction({
              data: response.categories,
            });
          }),
          catchError((error) =>
            of(
              categoriesActions.getCategoriesErrorAction({
                message: `Cannot get categories. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getPlaylistCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(categoriesActions.getCategoriesPlaylistAction),
      exhaustMap((res) =>
        this.categoriesService
          .getCategoriesPlayLists(res.category.id, res.url)
          .pipe(
            map((playlists) => {
              return categoriesActions.getCategoriesPlaylistSuccessAction({
                playlists,
              });
            }),
            catchError((error) =>
              of(
                categoriesActions.getCategoriesPlaylistErrorAction({
                  message: `Cannot get categories. Error: ${error.message}`,
                })
              )
            )
          )
      )
    );
  });
}
