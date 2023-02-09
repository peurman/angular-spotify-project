import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';
  searchInput = new Subject<string>();

  constructor() {
    this.searchInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        console.log(`Searching for: ${term}`);
      });
  }
}
