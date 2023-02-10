import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Artist, Artists } from '../models/search.interface';
import { Album, Albums } from '../models/search.interface';

import { getSearchArtistsAction } from 'src/app/store/search-artists/search-artists.actions';
import * as fromSearchArtists from 'src/app/store/search-artists/search-artists.selectors';

import { getSearchAlbumsAction } from 'src/app/store/search-albums/search-albums.actions';
import * as fromSearchAlbums from 'src/app/store/search-albums/search-albums.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  defaultAlbum = '../../../assets/images/defaultAlbum.jpg';
  defaultArtist = '../../../assets/images/defaultArtist.jpg';
  searchTerm = '';
  searchInput = new Subject<string>();
  // Artists
  searchArtists: Artist[] = [];
  searchArtistsNext: string | null = '';
  searchArtistsPrevious: string | null = '';
  searchArtists$!: Observable<Artists | null>;
  // Albums
  searchAlbums: Album[] = [];
  searchAlbumsNext: string | null = '';
  searchAlbumsPrevious: string | null = '';
  searchAlbums$!: Observable<Albums | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Artists
    this.searchArtists$ = this.store.select(
      fromSearchArtists.selectSearchArtistsData
    );
    // .pipe(tap((res) => console.log('RESPONSE', res)));
    this.searchInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        console.log(`Searching for: ${term}`);
        this.store.dispatch(
          getSearchArtistsAction({ url: '', searchedTerm: term })
        );
      });
    this.searchArtists$.subscribe((res) => {
      if (res) {
        this.searchArtists = res.items;
        this.searchArtistsNext = res.next;
        this.searchArtistsPrevious = res.previous;
      }
    });
    // Albums
    this.searchAlbums$ = this.store.select(
      fromSearchAlbums.selectSearchAlbumsData
    );
    // .pipe(tap((res) => console.log('RESPONSE', res)));
    this.searchInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        console.log(`Searching for: ${term}`);
        this.store.dispatch(
          getSearchAlbumsAction({ url: '', searchedTerm: term })
        );
      });
    this.searchAlbums$.subscribe((res) => {
      if (res) {
        this.searchAlbums = res.items;
        this.searchAlbumsNext = res.next;
        this.searchAlbumsPrevious = res.previous;
      }
    });
  }

  // Artists
  goToPreviousSearchArtists() {
    this.store.dispatch(
      getSearchArtistsAction({
        url: this.searchArtistsPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchArtists() {
    this.store.dispatch(
      getSearchArtistsAction({ url: this.searchArtistsNext, searchedTerm: '' })
    );
  }
  goToArtist(artistId: string) {
    console.log('ARTIST ID: ', artistId);
  }
  // Albums
  goToPreviousSearchAlbums() {
    this.store.dispatch(
      getSearchAlbumsAction({
        url: this.searchAlbumsPrevious,
        searchedTerm: '',
      })
    );
  }
  goToNextSearchAlbums() {
    this.store.dispatch(
      getSearchAlbumsAction({ url: this.searchAlbumsNext, searchedTerm: '' })
    );
  }
  goToAlbum(albumId: string) {
    console.log('ALBUM ID: ', albumId);
  }
}
