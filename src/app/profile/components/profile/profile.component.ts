/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromLogin from 'src/app/store/login/login.selectors';
import * as fromProfile from 'src/app/store/profile/profile.selectors';

import { User } from 'src/app/store/login/login.state';
import {
  followArtistsAction,
  getTopArtistsAction,
  getTopTracksAction,
  unFollowArtistsAction,
} from 'src/app/store/profile/profile.actions';
import { TopArtists } from '../../model/topartists.interface';
import { TopTracks, Track } from '../../model/toptracks.interface';
import { getTrackSuccessAction } from 'src/app/store/track/track.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileInfo$!: Observable<User | null>;
  topArtists$!: Observable<TopArtists | null>;
  topArtistsNext: string | null = '';
  topArtistsPrevious: string | null = '';
  topTracks$!: Observable<TopTracks | null>;
  topTracksNext: string | null = '';
  topTracksPrevious: string | null = '';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(getTopArtistsAction({ url: '' }));
    this.store.dispatch(getTopTracksAction({ url: '' }));
    this.profileInfo$ = this.store.select(fromLogin.selectProfileInfo);
    this.topArtists$ = this.store.select(fromProfile.selectTopArtists);
    this.topTracks$ = this.store.select(fromProfile.selectTopTracks);
    this.topArtists$.subscribe({
      next: (res) => {
        if (res) {
          this.topArtistsNext = res.next;
          this.topArtistsPrevious = res.previous;
        }
      },
    });
    this.topTracks$.subscribe({
      next: (res) => {
        if (res) {
          this.topTracksNext = res.next;
          this.topTracksPrevious = res.previous;
        }
      },
    });
  }
  handleSelectTrack(track: Track) {
    if (track) {
      this.store.dispatch(getTrackSuccessAction({ track }));
      this.router.navigateByUrl('tracks');
    }
  }
  handlePreviousArtist() {
    this.store.dispatch(getTopArtistsAction({ url: this.topArtistsPrevious }));
  }
  handleNextArtist() {
    this.store.dispatch(getTopArtistsAction({ url: this.topArtistsNext }));
  }
  handlePreviousTrack() {
    this.store.dispatch(getTopTracksAction({ url: this.topTracksPrevious }));
  }
  handleNextTrack() {
    this.store.dispatch(getTopTracksAction({ url: this.topTracksNext }));
  }
  handleFollowUnfollow(event: { type: string; id: string }) {
    if (event.type == 'unfollow') {
      this.store.dispatch(unFollowArtistsAction({ id: event.id }));
    } else {
      this.store.dispatch(followArtistsAction({ id: event.id }));
    }
  }
}
