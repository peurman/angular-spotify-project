/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on, Action } from '@ngrx/store';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { TopArtists } from 'src/app/profile/model/topartists.interface';
import * as profileActions from './profile.actions';
import { ProfileState } from './profile.state';

export const initialProfileState: ProfileState = {
  topArtists: null,
  topTracks: null,
  isLoading: false,
  isError: null,
};

const profileReducerInternal = createReducer(
  initialProfileState,
  on(profileActions.getTopArtistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(profileActions.getTopArtistsSuccessAction, (state, { data }) => {
    return {
      ...state,
      topArtists: data,
      isLoading: false,
    };
  }),
  on(profileActions.getTopArtistsErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  }),
  on(profileActions.getTopTracksAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(profileActions.getTopTracksSuccessAction, (state, { data }) => {
    return {
      ...state,
      topTracks: data,
      isLoading: false,
    };
  }),
  on(profileActions.getTopTracksErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  }),
  on(profileActions.unFollowArtistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(profileActions.unFollowArtistsSuccessAction, (state, { id }) => {
    const artistsFixed = state.topArtists?.items.map((artist: Artist) => {
      const artistFixed = { ...artist } as Artist;
      if (artist.id == id) {
        artistFixed.isFollowing = false;
      }
      return artistFixed;
    });
    const data = { ...state.topArtists } as TopArtists;
    if (artistsFixed) {
      data.items = artistsFixed;
    }
    return {
      ...state,
      topArtists: data,
      isLoading: false,
      isError: null,
    };
  }),
  on(profileActions.unFollowArtistsErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  }),
  on(profileActions.followArtistsAction, (state) => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(profileActions.followArtistsSuccessAction, (state, { id }) => {
    {
      const artistsFixed = state.topArtists?.items.map((artist: Artist) => {
        const artistFixed = { ...artist } as Artist;
        if (artist.id == id) {
          artistFixed.isFollowing = true;
        }
        return artistFixed;
      });
      const data = { ...state.topArtists } as TopArtists;
      if (artistsFixed) {
        data.items = artistsFixed;
      }
      return {
        ...state,
        topArtists: data,
        isLoading: false,
        isError: null,
      };
    }
  }),
  on(profileActions.followArtistsErrorAction, (state, { message }) => {
    return {
      ...state,
      isLoading: false,
      isError: message,
    };
  })
);

export function profileReducer(
  state: ProfileState | undefined,
  action: Action
) {
  return profileReducerInternal(state, action);
}
