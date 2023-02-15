import { Action, createReducer, on } from '@ngrx/store';
import { ArtistState } from './artist.state';
import * as artistActions from './artist.actions';
import * as profileActions from '../profile/profile.actions';
import * as trackActions from '../track/track.actions';
import * as albumActions from '../album/album.actions';
import { Artist } from 'src/app/home/models/new-releases.interface';
import {
  ArtistTracks,
  RelatedArtist,
} from 'src/app/artists/models/topartistracks.interface';
import { Albums } from 'src/app/search/models/search.interface';

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
  ),
  on(trackActions.SaveRemoveTrackAction, (state): ArtistState => {
    return {
      ...state,
      isLoading: true,
      isError: null,
    };
  }),
  on(
    trackActions.SaveRemoveTrackSuccessAction,
    (state, { id }): ArtistState => {
      const tracksUpdated = state.tracks?.tracks?.map((track) => {
        const trackFixed = { ...track };
        if (track.id == id) {
          trackFixed.saved = !track.saved;
        }
        return trackFixed;
      });
      const data = { ...state.tracks } as ArtistTracks;
      if (tracksUpdated) {
        data.tracks = tracksUpdated;
      }

      return {
        ...state,
        tracks: data,
        isLoading: false,
      };
    }
  ),
  on(
    albumActions.saveRemoveAlbumSuccessAction,
    (state, { id }): ArtistState => {
      const albumsUpdated = state.artistAlbums?.items.map((album) => {
        const albumFixed = { ...album };
        if (album.id == id) {
          albumFixed.saved = !album.saved;
        }
        return albumFixed;
      });

      const data = { ...state.artistAlbums } as Albums;
      if (albumsUpdated) {
        data.items = albumsUpdated;
      }
      return {
        ...state,
        artistAlbums: data,
        isLoading: false,
      };
    }
  )
);

export function artistReducer(state: ArtistState | undefined, action: Action) {
  return artistReducerInternal(state, action);
}
