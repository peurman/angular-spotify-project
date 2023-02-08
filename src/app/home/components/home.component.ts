import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesClass, Category } from '../models/categories.interface';
import { Album, Albums } from '../models/new-releases.interface';
import { Playlist, Playlists } from '../models/featured-playlists.interface';

import { getCategoriesAction } from 'src/app/store/categories/categories.actions';
import { getGenresAction } from 'src/app/store/genres/genres.actions';
import { getNewReleasesAction } from 'src/app/store/new-releases/new-releases.actions';
import { getFeaturedPlaylistsAction } from 'src/app/store/featured-playlists/featured-playlists.actions';

import * as fromCategories from 'src/app/store/categories/categories.selectors';
import * as fromGenres from 'src/app/store/genres/genres.selectors';
import * as fromNewReleases from 'src/app/store/new-releases/new-releases.selectors';
import * as fromFeaturedPlaylists from 'src/app/store/featured-playlists/featured-playlists.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoriesNext: string | null = '';
  categoriesPrevious: string | null = '';

  genres: string[] = [];
  // genresNext: string | null = '';
  // genresPrevious: string | null = '';

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

  constructor(private mainService: MainService, private store: Store) {}

  ngOnInit(): void {
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
      error: (error) => {
        console.log(error.message);
      },
    });

    //genres
    this.store.dispatch(getGenresAction({ url: '' }));
    this.genres$ = this.store.select(fromGenres.selectGenresData);
    this.genres$.subscribe({
      next: (res) => {
        if (res) {
          this.genres = res;
        }
      },
      error: (error) => {
        console.log(error.message);
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
      error: (error) => {
        console.log(error.message);
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
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  categoriesPreviousClick() {
    this.store.dispatch(getCategoriesAction({ url: this.categoriesPrevious }));
  }
  categoriesNextClick() {
    this.store.dispatch(getCategoriesAction({ url: this.categoriesNext }));
  }

  newReleasesPreviousClick() {
    this.store.dispatch(
      getNewReleasesAction({ url: this.newReleasesPrevious })
    );
  }
  newReleasesNextClick() {
    this.store.dispatch(getNewReleasesAction({ url: this.newReleasesNext }));
  }

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
}
