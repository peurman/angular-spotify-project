import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';
import { PlayListCategory } from '../../models/playlist.interface';
import * as fromCategories from 'src/app/store/categories/categories.selectors';
import { Categories, Category } from 'src/app/home/models/categories.interface';
import { getCategoriesPlaylistAction } from 'src/app/store/categories/categories.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  category$!: Observable<Category | null>;
  playLists$!: Observable<PlayListCategory | null>;
  playListsNext: string | null = '';
  playListsPrevious: string | null = '';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.category$ = this.store.select(fromCategories.selectCategorySelected);
    this.playLists$ = this.store.select(fromCategories.selectPlayLists);
    this.playLists$.subscribe({
      next: (res) => {
        if (res) {
          this.playListsNext = res.playlists.next;
          this.playListsPrevious = res.playlists.previous;
        }
      },
    });
  }

  goToPlaylist(id: string) {
    this.store.dispatch(getPlaylistAction({ id }));
    this.router.navigateByUrl('playlists');
  }
  handlePreviousPlaylists() {
    this.category$.subscribe((category) => {
      const url = this.playListsPrevious;

      if (category && url) {
        this.store.dispatch(getCategoriesPlaylistAction({ category, url }));
      }
    });
  }
  handleNextPlaylists() {
    this.category$.subscribe((category) => {
      const url = this.playListsNext;

      if (category && url) {
        this.store.dispatch(getCategoriesPlaylistAction({ category, url }));
      }
    });
  }
}
