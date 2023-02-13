import { Action, createReducer, on } from '@ngrx/store';
import { ArtistState } from './artist.state';
import * as artistActions from './artist.actions';
import * as profileActions from '../profile/profile.actions';
import { Artist } from 'src/app/home/models/new-releases.interface';

export const initialArtistState: ArtistState = {
  artist: null,
  artistAlbums: null,
  isLoading: false,
  isError: null,
};

const artistReducerInternal = createReducer(
  initialArtistState,
  on(artistActions.getArtistAction, (state): ArtistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(artistActions.getArtistSucessAction, (state, { data }): ArtistState => {
    return {
      ...state,
      artist: data,
      isLoading: false,
    };
  }),
  on(artistActions.getArtistErrorAction, (state, { message }): ArtistState => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  }),
  on(artistActions.getArtistAlbumsAction, (state): ArtistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    artistActions.getArtistAlbumsSucessAction,
    (state, { data }): ArtistState => {
      return {
        ...state,
        artistAlbums: data,
        isLoading: false,
        isError: null,
      };
    }
  ),
  on(
    artistActions.getArtistAlbumsErrorAction,
    (state, { message }): ArtistState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  ),
  on(profileActions.followArtistsSuccessAction, (state): ArtistState => {
    const artistUpdated = { ...state.artist } as Artist;
    artistUpdated.isFollowing = true;
    return {
      ...state,
      artist: artistUpdated,
    };
  }),
  on(profileActions.unFollowArtistsSuccessAction, (state): ArtistState => {
    const artistUpdated = { ...state.artist } as Artist;
    artistUpdated.isFollowing = false;
    return {
      ...state,
      artist: artistUpdated,
    };
  })
);

export function artistReducer(state: ArtistState | undefined, action: Action) {
  return artistReducerInternal(state, action);
}
