import { CategoriesState } from './categories/categories.state';
import { categoriesReducer } from './categories/categories.reducer';
import { CategoriesEffects } from './categories/categories.effects';
import * as fromCategoriesSelectors from './categories/categories.selectors';

import { GenresState } from './genres/genres.state';
import { genresReducer } from './genres/genres.reducer';
import { GenresEffects } from './genres/genres.effects';
import * as fromGenresSelectors from './genres/genres.selectors';

import { NewReleasesState } from './new-releases/new-releases.state';
import { newReleasesReducer } from './new-releases/new-releases.reducer';
import { NewReleasesEffects } from './new-releases/new-releases.effects';
import * as fromNewReleasesSelectors from './new-releases/new-releases.selectors';

import { FeaturedPlaylistsState } from './featured-playlists/featured-playlists.state';
import { featuredPlaylistsReducer } from './featured-playlists/featured-playlists.reducer';
import { FeaturedPlaylistsEffects } from './featured-playlists/featured-playlists.effects';
import * as fromFeaturedPlaylistsSelectors from './featured-playlists/featured-playlists.selectors';

import { LoginState } from './login/login.state';
import { loginReducer } from './login/login.reducer';
import { LoginEffects } from './login/login.effects';
import * as fromLoginSelectors from './login/login.selectors';

import { ProfileState } from './profile/profile.state';
import { profileReducer } from './profile/profile.reducer';
import { ProfileEffects } from './profile/profile.effects';

import { SearchArtistsState } from './search-artists/search-artists.state';
import { searchArtistsReducer } from './search-artists/search-artists.reducer';
import { SearchArtistsEffects } from './search-artists/search-artists.effects';
import * as fromSearchArtistsSelectors from './search-artists/search-artists.selectors';

import { SearchAlbumsState } from './search-albums/search-albums.state';
import { searchAlbumsReducer } from './search-albums/search-albums.reducer';
import { SearchAlbumsEffects } from './search-albums/search-albums.effects';
import * as fromSearchAlbumsSelectors from './search-albums/search-albums.selectors';

import { SearchPlaylistsState } from './search-playlists/search-playlists.state';
import { searchPlaylistsReducer } from './search-playlists/search-playlists.reducer';
import { SearchPlaylistsEffects } from './search-playlists/search-playlists.effects';
import * as fromSearchPlaylistsSelectors from './search-playlists/search-playlists.selectors';

import { SearchTracksState } from './search-tracks/search-tracks.state';
import { searchTracksReducer } from './search-tracks/search-tracks.reducer';
import { SearchTracksEffects } from './search-tracks/search-tracks.effects';
import * as fromSearchTracksSelectors from './search-tracks/search-tracks.selectors';

import { AlbumDetailState } from './album/album.state';
import { albumDetailReducer } from './album/album.reducer';
import { AlbumDetailEffects } from './album/album.effects';
import * as fromAlbumDetailSelectors from './album/album.selectors';

import { TrackState } from './track/track.state';
import { trackReducer } from './track/track.reducer';
import { TrackEffects } from './track/track.effects';
import * as fromTrackSelectors from './track/track.selector';

export interface RootState {
  loggedIn: LoginState;
  categories: CategoriesState;
  genres: GenresState;
  newReleases: NewReleasesState;
  featuredPlaylists: FeaturedPlaylistsState;
  profile: ProfileState;
  track: TrackState;
  searchArtists: SearchArtistsState;
  searchAlbums: SearchAlbumsState;
  searchPlaylists: SearchPlaylistsState;
  searchTracks: SearchTracksState;
  albumDetail: AlbumDetailState;
}

export const appReducer = {
  loggedIn: loginReducer,
  categories: categoriesReducer,
  genres: genresReducer,
  newReleases: newReleasesReducer,
  featuredPlaylists: featuredPlaylistsReducer,
  profile: profileReducer,
  track: trackReducer,
  searchArtists: searchArtistsReducer,
  searchAlbums: searchAlbumsReducer,
  searchPlaylists: searchPlaylistsReducer,
  searchTracks: searchTracksReducer,
  albumDetail: albumDetailReducer,
};

export const appEffects = [
  CategoriesEffects,
  GenresEffects,
  NewReleasesEffects,
  FeaturedPlaylistsEffects,
  LoginEffects,
  ProfileEffects,
  TrackEffects,
  SearchArtistsEffects,
  SearchAlbumsEffects,
  SearchPlaylistsEffects,
  SearchTracksEffects,
  AlbumDetailEffects,
];

export const appSelectors = [
  fromCategoriesSelectors.selectCategoriesData,
  fromCategoriesSelectors.selectIsError,
  fromCategoriesSelectors.selectIsLoading,
  fromGenresSelectors.selectGenresData,
  fromGenresSelectors.selectIsError,
  fromGenresSelectors.selectIsLoading,
  fromNewReleasesSelectors.selectNewReleasesData,
  fromNewReleasesSelectors.selectIsError,
  fromNewReleasesSelectors.selectIsLoading,
  fromFeaturedPlaylistsSelectors.selectNewReleasesData,
  fromFeaturedPlaylistsSelectors.selectIsError,
  fromFeaturedPlaylistsSelectors.selectIsLoading,
  fromLoginSelectors.selectLogin,
  fromTrackSelectors.selectTrack,
  fromSearchArtistsSelectors.selectSearchArtistsData,
  fromSearchArtistsSelectors.selectIsError,
  fromSearchArtistsSelectors.selectIsLoading,
  fromSearchAlbumsSelectors.selectSearchAlbumsData,
  fromSearchAlbumsSelectors.selectIsError,
  fromSearchAlbumsSelectors.selectIsLoading,
  fromSearchPlaylistsSelectors.selectSearchPlaylistsData,
  fromSearchPlaylistsSelectors.selectIsError,
  fromSearchPlaylistsSelectors.selectIsLoading,
  fromSearchTracksSelectors.selectSearchTracksData,
  fromSearchTracksSelectors.selectIsError,
  fromSearchTracksSelectors.selectIsLoading,
  fromAlbumDetailSelectors.selectAlbumDetailData,
  fromAlbumDetailSelectors.selectIsError,
  fromAlbumDetailSelectors.selectIsLoading,
];
