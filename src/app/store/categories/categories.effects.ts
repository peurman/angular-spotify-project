import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as categoriesActions from './categories.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainService } from 'src/app/home/services/main.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoryService: MainService
  ) {}

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(categoriesActions.getCategoriesAction),
      exhaustMap((res) =>
        this.categoryService.getCategories(res.url).pipe(
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
}
