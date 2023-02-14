import { createReducer, on, Action } from '@ngrx/store';
import * as myMusicActions from './my-music.actions';
import { MyMusicState } from './my-music.state';

export const initialMyMusicState: MyMusicState = {
  playlists: {
    data: null,
    isLoading: false,
    isError: null,
  },
  tracks: {
    data: null,
    isLoading: false,
    isError: null,
  },
  albums: {
    data: null,
    isLoading: false,
    isError: null,
  },
  artists: {
    data: null,
    isLoading: false,
    isError: null,
  },
};

const myMusicReducerInternal = createReducer(
  initialMyMusicState,
  on(myMusicActions.getMyPlaylistsAction, (state): MyMusicState => {
    return {
      ...state,
      playlists: {
        data: null,
        isLoading: true,
        isError: null,
      },
    };
  }),
  on(
    myMusicActions.getMyPlaylistsSuccessAction,
    (state, { data }): MyMusicState => {
      return {
        ...state,
        playlists: {
          data: data,
          isLoading: false,
          isError: null,
        },
      };
    }
  ),
  on(
    myMusicActions.getMyPlaylistsErrorAction,
    (state, { message }): MyMusicState => {
      return {
        ...state,
        playlists: {
          data: null,
          isLoading: false,
          isError: message,
        },
      };
    }
  ),
  on(myMusicActions.getMyArtistsAction, (state): MyMusicState => {
    return {
      ...state,
      artists: {
        data: null,
        isLoading: true,
        isError: null,
      },
    };
  }),
  on(
    myMusicActions.getMyArtistsSuccessAction,
    (state, { data }): MyMusicState => {
      return {
        ...state,
        artists: {
          data: data,
          isLoading: false,
          isError: null,
        },
      };
    }
  ),
  on(
    myMusicActions.getMyArtistsErrorAction,
    (state, { message }): MyMusicState => {
      return {
        ...state,
        artists: {
          data: null,
          isLoading: false,
          isError: message,
        },
      };
    }
  ),
  on(myMusicActions.getMyAlbumsAction, (state): MyMusicState => {
    return {
      ...state,
      albums: {
        data: null,
        isLoading: true,
        isError: null,
      },
    };
  }),
  on(
    myMusicActions.getMyAlbumsSuccessAction,
    (state, { data }): MyMusicState => {
      return {
        ...state,
        albums: {
          data: data,
          isLoading: false,
          isError: null,
        },
      };
    }
  ),
  on(
    myMusicActions.getMyAlbumsErrorAction,
    (state, { message }): MyMusicState => {
      return {
        ...state,
        albums: {
          data: null,
          isLoading: false,
          isError: message,
        },
      };
    }
  ),
  on(myMusicActions.getMyTracksAction, (state): MyMusicState => {
    return {
      ...state,
      tracks: {
        data: null,
        isLoading: true,
        isError: null,
      },
    };
  }),
  on(
    myMusicActions.getMyTracksSuccessAction,
    (state, { data }): MyMusicState => {
      return {
        ...state,
        tracks: {
          data: data,
          isLoading: false,
          isError: null,
        },
      };
    }
  ),
  on(
    myMusicActions.getMyTracksErrorAction,
    (state, { message }): MyMusicState => {
      return {
        ...state,
        tracks: {
          data: null,
          isLoading: false,
          isError: message,
        },
      };
    }
  )
);
export function myMusicReducer(
  state: MyMusicState | undefined,
  action: Action
) {
  return myMusicReducerInternal(state, action);
}
