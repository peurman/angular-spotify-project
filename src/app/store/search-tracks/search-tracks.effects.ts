import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as searchTracksActions from './search-tracks.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from 'src/app/search/services/search.service';

@Injectable()
export class SearchTracksEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  getSearchTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchTracksActions.getSearchTracksAction),
      exhaustMap((res) =>
        this.searchService.getTracksSearched(res.url, res.searchedTerm).pipe(
          map((response) => {
            return searchTracksActions.getSearchTracksSuccessAction({
              data: response.tracks,
            });
          }),
          catchError((error) =>
            of(
              searchTracksActions.getSearchTracksErrorAction({
                message: `There are no tracks with that term. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
