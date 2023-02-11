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
import { ProfileEffects } from './profile/profile.effects';
import { profileReducer } from './profile/profile.reducer';

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
}

export const appReducer = {
  loggedIn: loginReducer,
  categories: categoriesReducer,
  genres: genresReducer,
  newReleases: newReleasesReducer,
  featuredPlaylists: featuredPlaylistsReducer,
  profile: profileReducer,
  track: trackReducer,
};

export const appEffects = [
  CategoriesEffects,
  GenresEffects,
  NewReleasesEffects,
  FeaturedPlaylistsEffects,
  LoginEffects,
  ProfileEffects,
  TrackEffects,
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
];
