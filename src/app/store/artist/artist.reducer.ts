import { Action, createReducer, on } from '@ngrx/store';
import { ArtistState } from './artist.state';
import * as artistActions from './artist.actions';

export const initialArtistState: ArtistState = {
  artist: null,
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
  })
);

export function artistReducer(state: ArtistState | undefined, action: Action) {
  return artistReducerInternal(state, action);
}
