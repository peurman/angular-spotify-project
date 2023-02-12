import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CategoriesClass, Category } from '../models/categories.interface';
import { Album, Albums } from '../models/new-releases.interface';
import { Playlist, Playlists } from '../models/featured-playlists.interface';

import { getCategoriesAction } from 'src/app/store/categories/categories.actions';
import { getGenresAction } from 'src/app/store/genres/genres.actions';
import { getNewReleasesAction } from 'src/app/store/new-releases/new-releases.actions';
import { getFeaturedPlaylistsAction } from 'src/app/store/featured-playlists/featured-playlists.actions';
import { getAlbumDetailAction } from 'src/app/store/album/album.actions';

import * as fromCategories from 'src/app/store/categories/categories.selectors';
import * as fromGenres from 'src/app/store/genres/genres.selectors';
import * as fromNewReleases from 'src/app/store/new-releases/new-releases.selectors';
import * as fromFeaturedPlaylists from 'src/app/store/featured-playlists/featured-playlists.selectors';
import * as fromLogin from 'src/app/store/login/login.selectors';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username$!: Observable<string | undefined>;

  categories: Category[] = [];
  categoriesNext: string | null = '';
  categoriesPrevious: string | null = '';

  genres: string[] = [];
  genresPerPage = 15;
  currentGenresPage = 0;
  genresNext = true;
  genresPrevious = false;

  newReleases: Album[] = [];
  newReleasesNext: string | null = '';
  newReleasesPrevious: string | null = '';

  featuredPlaylists: Playlist[] = [];
  featuredPlaylistsNext: string | null = '';
  featuredPlaylistsPrevious: string | null = '';

  categories$!: Observable<CategoriesClass | null>;
  genres$!: Observable<string[] | null>;
  newReleases$!: Observable<Albums | null>;
  featuredPlaylists$!: Observable<Playlists | null>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.username$ = this.store.select(fromLogin.selectLoginUsername);
    //categories
    this.store.dispatch(getCategoriesAction({ url: '' }));
    this.categories$ = this.store.select(fromCategories.selectCategoriesData);
    this.categories$.subscribe({
      next: (res) => {
        if (res) {
          this.categories = res.items;
          this.categoriesNext = res.next;
          this.categoriesPrevious = res.previous;
        }
      },
    });

    //genres
    this.store.dispatch(getGenresAction({ url: '' }));
    this.genres$ = this.store.select(fromGenres.selectGenresData);
    this.genres$.subscribe({
      next: (res) => {
        if (res) this.genres = res;
      },
    });

    //new releases
    this.store.dispatch(getNewReleasesAction({ url: '' }));
    this.newReleases$ = this.store.select(
      fromNewReleases.selectNewReleasesData
    );
    this.newReleases$.subscribe({
      next: (res) => {
        if (res) {
          this.newReleases = res.items;
          this.newReleasesNext = res.next;
          this.newReleasesPrevious = res.previous;
        }
      },
    });

    // featured playlists
    this.store.dispatch(getFeaturedPlaylistsAction({ url: '' }));
    this.featuredPlaylists$ = this.store.select(
      fromFeaturedPlaylists.selectNewReleasesData
    );
    this.featuredPlaylists$.subscribe({
      next: (res) => {
        if (res) {
          this.featuredPlaylists = res.items;
          this.featuredPlaylistsNext = res.next;
          this.featuredPlaylistsPrevious = res.previous;
        }
      },
    });
  }

  //categories
  categoriesPreviousClick() {
    this.store.dispatch(getCategoriesAction({ url: this.categoriesPrevious }));
  }
  categoriesNextClick() {
    this.store.dispatch(getCategoriesAction({ url: this.categoriesNext }));
  }
  //genres
  get currentGenres(): string[] {
    return this.genres.slice(
      this.currentGenresPage * this.genresPerPage,
      (this.currentGenresPage + 1) * this.genresPerPage
    );
  }
  genresPreviousClick(): void {
    if (this.currentGenresPage > 0) this.currentGenresPage--;
    if (this.currentGenresPage === 0) this.genresPrevious = false;
    if (
      this.currentGenresPage <
      Math.ceil(this.genres.length / this.genresPerPage) - 1
    ) {
      this.genresNext = true;
    } else this.genresNext = false;
  }
  genresNextClick(): void {
    if (
      this.currentGenresPage <
      Math.ceil(this.genres.length / this.genresPerPage) - 1
    )
      this.currentGenresPage++;
    if (
      this.currentGenresPage ===
      Math.ceil(this.genres.length / this.genresPerPage) - 1
    )
      this.genresNext = false;

    if (this.currentGenresPage > 0) {
      this.genresPrevious = true;
    } else this.genresPrevious = false;
  }
  //new releases
  newReleasesPreviousClick() {
    this.store.dispatch(
      getNewReleasesAction({ url: this.newReleasesPrevious })
    );
  }
  newReleasesNextClick() {
    this.store.dispatch(getNewReleasesAction({ url: this.newReleasesNext }));
  }
  goToAlbum(id: string) {
    this.store.dispatch(getAlbumDetailAction({ id }));
    this.router.navigate(['/albums']);
  }
  // featured playlists
  featuredPlaylistsPreviousClick() {
    this.store.dispatch(
      getFeaturedPlaylistsAction({ url: this.featuredPlaylistsPrevious })
    );
  }
  featuredPlaylistsNextClick() {
    this.store.dispatch(
      getFeaturedPlaylistsAction({ url: this.featuredPlaylistsNext })
    );
  }
  goToPlaylist(id: string) {
    this.store.dispatch(getPlaylistAction({ id }));
    this.router.navigate(['/playlists']);
  }
}
