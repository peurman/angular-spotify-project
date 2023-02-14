import { Action, createReducer, on } from '@ngrx/store';
import { ArtistState } from './artist.state';
import * as artistActions from './artist.actions';
import * as profileActions from '../profile/profile.actions';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { RelatedArtist } from 'src/app/artists/models/topartistracks.interface';

export const initialArtistState: ArtistState = {
  artist: null,
  artistAlbums: null,
  relatedArtists: null,
  tracks: null,
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
  on(
    profileActions.followArtistsSuccessAction,
    (state, { id }): ArtistState => {
      const artistUpdated = { ...state.artist } as Artist;
      if (id == artistUpdated.id) {
        //sameArtist
        artistUpdated.isFollowing = true;
        return {
          ...state,
          artist: artistUpdated,
        };
      } else {
        //differentArtist
        const artistsFixed = state.relatedArtists?.artists.map(
          (artist: Artist) => {
            const artistFixed = { ...artist } as Artist;
            if (artist.id == id) {
              artistFixed.isFollowing = true;
            }
            return artistFixed;
          }
        );
        const data = { ...state.relatedArtists } as RelatedArtist;
        if (artistsFixed) {
          data.artists = artistsFixed;
        }
        return {
          ...state,
          relatedArtists: data,
        };
      }
    }
  ),
  on(profileActions.unFollowArtistsSuccessAction, (state): ArtistState => {
    const artistUpdated = { ...state.artist } as Artist;
    artistUpdated.isFollowing = false;
    return {
      ...state,
      artist: artistUpdated,
    };
  }),
  on(artistActions.getArtistTracksAction, (state): ArtistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    artistActions.getArtistTracksSucessAction,
    (state, { tracks }): ArtistState => {
      return {
        ...state,
        tracks: tracks,
        isLoading: false,
      };
    }
  ),
  on(
    artistActions.getArtistTracksErrorAction,
    (state, { message }): ArtistState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  ),
  on(artistActions.getSuggestedArtist, (state): ArtistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    artistActions.getSuggestedArtistSucessAction,
    (state, { artists }): ArtistState => {
      return {
        ...state,
        relatedArtists: artists,
        isLoading: false,
      };
    }
  ),
  on(
    artistActions.getSuggestedArtistErrorAction,
    (state, { message }): ArtistState => {
      return {
        ...state,
        isLoading: false,
        isError: message,
      };
    }
  )
);

export function artistReducer(state: ArtistState | undefined, action: Action) {
  return artistReducerInternal(state, action);
}
