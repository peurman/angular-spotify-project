import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as searchPlaylistsActions from './search-playlists.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from 'src/app/search/services/search.service';

@Injectable()
export class SearchPlaylistsEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  getSearchPlaylists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchPlaylistsActions.getSearchPlaylistsAction),
      exhaustMap((res) =>
        this.searchService.getPlaylistsSearched(res.url, res.searchedTerm).pipe(
          map((response) => {
            return searchPlaylistsActions.getSearchPlaylistsSuccessAction({
              data: response.playlists,
            });
          }),
          catchError((error) =>
            of(
              searchPlaylistsActions.getSearchPlaylistsErrorAction({
                message: `There are no playlists with that term. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
