import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as searchAlbumsActions from './search-albums.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from 'src/app/search/services/search.service';

@Injectable()
export class SearchAlbumsEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  getSearchAlbums$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchAlbumsActions.getSearchAlbumsAction),
      exhaustMap((res) =>
        this.searchService.getAlbumsSearched(res.url, res.searchedTerm).pipe(
          map((response) => {
            return searchAlbumsActions.getSearchAlbumsSuccessAction({
              data: response.albums,
            });
          }),
          catchError((error) =>
            of(
              searchAlbumsActions.getSearchAlbumsErrorAction({
                message: `There are no albums with that term. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
