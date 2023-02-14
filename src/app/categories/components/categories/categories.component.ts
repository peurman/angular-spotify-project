import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';
import { PlayListCategory } from '../../models/playlist.interface';
import * as fromCategories from 'src/app/store/categories/categories.selectors';
import { Categories } from 'src/app/home/models/categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$!: Observable<Categories>;
  playLists$!: Observable<PlayListCategory | null>;
  playListsNext: string | null = '';
  playListsPrevious: string | null = '';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    //this.store.dispatch(getPlaylistAction({id:}))

    this.playLists$ = this.store.select(fromCategories.selectPlayLists);
    this.playLists$.subscribe({
      next: (res) => {
        if (res) {
          this.playListsNext = res.playlists.next;
          this.playListsPrevious = res.playlists.previous;
          console.log('data', res);
        }
      },
    });

    // this.topArtists$ = this.store.select(fromProfile.selectTopArtists);
    // this.topArtists$.subscribe({
    //   next: (res) => {
    //     if (res) {
    //       this.topArtistsNext = res.next;
    //       this.topArtistsPrevious = res.previous;
    //     }
    //   },
    // });
  }
}
