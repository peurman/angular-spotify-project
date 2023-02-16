import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GenreRecommendations } from '../models/genres.interface';

import * as fromRecommendations from 'src/app/store/recommendations/recommendations.selectors';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import {
  getTrackAction,
  SaveRemoveTrackAction,
} from 'src/app/store/track/track.actions';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  musicGenres = '../../../assets/images/musicGenres.jpg';
  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';

  recommendations$!: Observable<GenreRecommendations | null>;
  recommendationsIsLoading$!: Observable<boolean | null>;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.recommendations$ = this.store.select(
      fromRecommendations.selectRecommendationsData
    );
    this.recommendationsIsLoading$ = this.store.select(
      fromRecommendations.selectIsLoading
    );
  }

  goToArtist(id: string) {
    this.store.dispatch(getArtistAction({ id }));
    this.router.navigateByUrl('artists');
  }

  goToTrack(id: string) {
    this.store.dispatch(getTrackAction({ id }));
    this.router.navigateByUrl('tracks');
  }

  addRemoveTrack(id: string, saved: boolean) {
    this.store.dispatch(SaveRemoveTrackAction({ id, save: !saved }));
  }
}
