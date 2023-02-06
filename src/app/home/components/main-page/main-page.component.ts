import { Component, Input } from '@angular/core';
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
  @Input() categoriesList: Category[] = [];
  @Input() newReleasesList: Album[] = [];
  @Input() featuredPlaylistsList: Playlist[] = [];
}
