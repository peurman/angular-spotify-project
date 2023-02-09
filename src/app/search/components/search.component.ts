import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Artist, Artists } from '../models/search.interface';
import { getSearchArtistsAction } from 'src/app/store/search-artists/search-artists.actions';
import * as fromSearchArtists from 'src/app/store/search-artists/search-artists.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterContentInit {
  searchTerm = '';
  searchInput = new Subject<string>();

  searchArtists: Artist[] = [];
  searchArtistsNext: string | null = '';
  searchArtistsPrevious: string | null = '';
  searchArtists$!: Observable<Artists | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        console.log(`Searching for: ${term}`);
        this.store.dispatch(
          getSearchArtistsAction({ url: '', searchedTerm: term })
        );
      });
  }

  ngAfterContentInit() {
    this.searchArtists$ = this.store.select(
      fromSearchArtists.selectSearchArtistsData
    );
    this.searchArtists$.subscribe({
      next: (res) => {
        if (res) {
          this.searchArtists = res.items;
          this.searchArtistsNext = res.next;
          this.searchArtistsPrevious = res.previous;
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  goToPreviousSearchArtists() {
    console.log('PREVIOUS');
  }
  goToNextSearchArtists() {
    console.log('NEXT');
  }
  goToArtist(artistId: string) {
    console.log('ARTIST ID: ', artistId);
  }
}
