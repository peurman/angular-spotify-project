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
  genres: string[] = [];
  newReleases: Album[] = [];
  featuredPlaylists: Playlist[] = [];

  categories$!: Observable<CategoriesClass | null>;
  genres$!: Observable<string[] | null>;
  newReleases$!: Observable<Albums | null>;
  featuredPlaylists$!: Observable<Playlists | null>;

  constructor(private mainService: MainService, private store: Store) {}

  ngOnInit(): void {
    //categories
    this.store.dispatch(getCategoriesAction());
    this.categories$ = this.store.select(fromCategories.selectCategoriesData);
    this.categories$.subscribe({
      next: (res) => {
        if (res) this.categories = res.items;
      },
      error: (error) => {
        console.log(error.message);
      },
    });

    //genres
    this.store.dispatch(getGenresAction());
    this.genres$ = this.store.select(fromGenres.selectGenresData);
    this.genres$.subscribe({
      next: (res) => {
        if (res) this.genres = res;
      },
      error: (error) => {
        console.log(error.message);
      },
    });

    //new releases
    this.store.dispatch(getNewReleasesAction());
    this.newReleases$ = this.store.select(
      fromNewReleases.selectNewReleasesData
    );
    this.newReleases$.subscribe({
      next: (res) => {
        if (res) this.newReleases = res.items;
      },
      error: (error) => {
        console.log(error.message);
      },
    });

    // featured playlists
    this.store.dispatch(getFeaturedPlaylistsAction());
    this.featuredPlaylists$ = this.store.select(
      fromFeaturedPlaylists.selectNewReleasesData
    );
    this.featuredPlaylists$.subscribe({
      next: (res) => {
        if (res) this.featuredPlaylists = res.items;
      },
      error: (error) => {
        console.log(error.message);
      },
    });

    // this.mainService.getFeaturedPlaylists().subscribe({
    //   next: (data) => {
    //     this.featuredPlaylists = data.playlists.items;
    //   },
    //   error: (error) => {
    //     alert(error.message);
    //   },
    // });
  }
}
