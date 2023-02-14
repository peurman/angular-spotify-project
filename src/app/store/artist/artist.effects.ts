import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArtistinfoService } from 'src/app/artists/services/artistinfo.service';
import { TopItems } from 'src/app/profile/services/topitems.service';
import * as artistActions from './artist.actions';

@Injectable()
export class ArtistEffects {
  constructor(
    private actions$: Actions,
    private artistService: ArtistinfoService,
    private topService: TopItems
  ) {}

  getArtistInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistAction),
      switchMap((res) =>
        this.artistService.getArtistInfo(res.id).pipe(
          switchMap((response) => {
            return this.topService.checkFollowing([response]).pipe(
              map((followingResponse) => {
                response.isFollowing = followingResponse[0];
                return artistActions.getArtistSucessAction({
                  data: response,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              artistActions.getArtistErrorAction({
                message: `Cannot get artist. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getArtistAlbums = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistAlbumsAction),
      switchMap((res) =>
        this.artistService.getArtistAlbums(res.id, res.url).pipe(
          switchMap((response) => {
            return this.topService.checkSavedAlbum(response).pipe(
              map((booleanResponse) => {
                console.log('booleanResponse', booleanResponse);
                response.items.forEach((album, index) => {
                  const albumValue = booleanResponse[index];
                  if (albumValue) {
                    album.saved = true;
                  } else {
                    album.saved = false;
                  }
                });
                return artistActions.getArtistAlbumsSucessAction({
                  data: response,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              artistActions.getArtistAlbumsErrorAction({
                message: `Cannot get albums. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getArtistTracks = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getArtistTracksAction),
      switchMap((res) =>
        this.artistService.getArtistTopTracks(res.id).pipe(
          switchMap((tracks) => {
            return this.topService.checkSavedTracks(tracks.tracks).pipe(
              map((booleanResponse) => {
                tracks.tracks.forEach((track, index) => {
                  const trackValue = booleanResponse[index];
                  if (trackValue) {
                    track.saved = true;
                  } else {
                    track.saved = false;
                  }
                });
                return artistActions.getArtistTracksSucessAction({
                  tracks,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              artistActions.getArtistTracksErrorAction({
                message: `Cannot get tracks. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
  getSuggestedArtist = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActions.getSuggestedArtist),
      switchMap((res) =>
        this.artistService.getSuggestedArtist(res.id).pipe(
          switchMap((artists) => {
            return this.topService.checkFollowing(artists.artists).pipe(
              map((booleanResponse) => {
                artists.artists.forEach((artist, index) => {
                  const artistValue = booleanResponse[index];
                  if (artistValue) {
                    artist.isFollowing = true;
                  } else {
                    artist.isFollowing = false;
                  }
                });
                return artistActions.getSuggestedArtistSucessAction({
                  artists,
                });
              })
            );
          }),
          catchError((error) =>
            of(
              artistActions.getSuggestedArtistErrorAction({
                message: `Cannot get artists. Error: ${error.message}`,
              })
            )
          )
        )
      )
    );
  });
}
