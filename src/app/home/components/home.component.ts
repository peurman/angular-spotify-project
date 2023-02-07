import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

import { Category } from '../models/categories.interface';
import { Album } from '../models/new-releases.interface';
import { Playlist } from '../models/featured-playlists.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  genres: string[] = [];
  categories: Category[] = [];
  newReleases: Album[] = [];
  featuredPlaylists: Playlist[] = [];

  constructor(private mainService: MainService) {
    this.mainService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (error) => {},
    });
    this.mainService.getCategories('').subscribe({
      next: (data) => {
        this.categories = data.categories.items;
      },
      error: (error) => {},
    });
    this.mainService.getNewReleases().subscribe({
      next: (data) => {
        this.newReleases = data.albums.items;
      },
      error: (error) => {},
    });
    this.mainService.getFeaturedPlaylists().subscribe({
      next: (data) => {
        this.featuredPlaylists = data.playlists.items;
      },
      error: (error) => {},
    });
  }
}
