import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as searchArtistsActions from './search-artists.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from 'src/app/search/services/search.service';

@Injectable()
export class SearchArtistsEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  getSearchArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchArtistsActions.getSearchArtistsAction),
      exhaustMap((res) =>
        this.searchService.getArtistsSearched(res.url, res.searchedTerm).pipe(
          map((response) => {
            return searchArtistsActions.getSearchArtistsSuccessAction({
              data: response.artists,
            });
          }),
          catchError((error) =>
            of(
              searchArtistsActions.getSearchArtistsErrorAction({
                message: `There are no artists with that term. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
