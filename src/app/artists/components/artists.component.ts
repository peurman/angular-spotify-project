import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/search/models/search.interface';
import * as fromArtist from 'src/app/store/artist/artist.selectors';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artistInfo$!: Observable<Artist | null>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.artistInfo$ = this.store.select(fromArtist.selectArtistData);
  }
}
