import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/categories.interface';
import { Playlist } from '../../models/featured-playlists.interface';
import { Album } from '../../models/new-releases.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  @Input() genresList: string[] = [];
  @Input() genresPrevious!: boolean;
  @Input() genresNext!: boolean;
  @Output() genresNextClick: EventEmitter<null> = new EventEmitter();
  @Output() genresPreviousClick: EventEmitter<null> = new EventEmitter();

  @Input() categoriesList: Category[] = [];
  @Input() categoriesPrevious!: boolean;
  @Input() categoriesNext!: boolean;
  @Output() categoriesNextClick: EventEmitter<null> = new EventEmitter();
  @Output() categoriesPreviousClick: EventEmitter<null> = new EventEmitter();

  @Input() newReleasesList: Album[] = [];
  @Input() newReleasesPrevious!: boolean;
  @Input() newReleasesNext!: boolean;
  @Output() newReleasesNextClick: EventEmitter<null> = new EventEmitter();
  @Output() newReleasesPreviousClick: EventEmitter<null> = new EventEmitter();
  @Output() goToAlbumClick: EventEmitter<string> = new EventEmitter();

  @Input() featuredPlaylistsList: Playlist[] = [];
  @Input() featuredPlaylistsPrevious!: boolean;
  @Input() featuredPlaylistsNext!: boolean;
  @Output() featuredPlaylistsNextClick: EventEmitter<null> = new EventEmitter();
  @Output() featuredPlaylistsPreviousClick: EventEmitter<null> =
    new EventEmitter();

  @Output() goToTrackClick: EventEmitter<string> = new EventEmitter();
  @Output() goToPlaylistClick: EventEmitter<string> = new EventEmitter();
  @Output() goToCategoryClick: EventEmitter<Category> = new EventEmitter();
  handleClickNewReleases(trackCount: number, id: string) {
    this.goToAlbum(id);
  }
  goToTrack(trackId: string) {
    this.goToTrackClick.emit(trackId);
  }
  goToAlbum(albumId: string) {
    this.goToAlbumClick.emit(albumId);
  }
  goToPlaylist(playlistId: string) {
    this.goToPlaylistClick.emit(playlistId);
  }
  goToCategory(category: Category) {
    this.goToCategoryClick.emit(category);
  }
  goToGenre(genre: string) {
    console.log(genre);
  }
  goToPreviousNewReleases() {
    this.newReleasesPreviousClick.emit();
  }
  goToNextNewReleases() {
    this.newReleasesNextClick.emit();
  }

  goToPreviousFeaturedPlaylists() {
    this.featuredPlaylistsPreviousClick.emit();
  }

  goToNextFeaturedPlaylists() {
    this.featuredPlaylistsNextClick.emit();
  }

  goToPreviousCategories() {
    this.categoriesPreviousClick.emit();
  }

  goToNextCategories() {
    this.categoriesNextClick.emit();
  }

  goToPreviousGenres() {
    this.genresPreviousClick.emit();
  }

  goToNextGenres() {
    this.genresNextClick.emit();
  }
}
