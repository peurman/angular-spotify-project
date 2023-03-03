import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    // this.store.dispatch(SaveRemoveTrackAction({ id, save: !saved }));

    if (saved) {
      Swal.fire({
        title: 'Are you sure you want to remove this track?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#db1c1c',
        confirmButtonText: 'Yes, remove',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(SaveRemoveTrackAction({ id: id, save: false }));
        }
      });
    } else this.store.dispatch(SaveRemoveTrackAction({ id, save: true }));
  }
}
