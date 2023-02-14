/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { Albums } from 'src/app/search/models/search.interface';
import {
  getArtistAction,
  getArtistAlbumsAction,
  getArtistTracksAction,
  getSuggestedArtist,
} from 'src/app/store/artist/artist.actions';
import * as fromArtist from 'src/app/store/artist/artist.selectors';
import {
  followArtistsAction,
  unFollowArtistsAction,
} from 'src/app/store/profile/profile.actions';
import {
  ArtistTracks,
  RelatedArtist,
} from '../models/topartistracks.interface';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  displayMore = false;
  suggestedArtist$!: Observable<RelatedArtist | null>;
  artistInfo$!: Observable<Artist | null>;
  artistAlbums$!: Observable<Albums | null>;
  ArtistsAlbumsNext: string | null = '';
  ArtistsAlbumsPrevious: string | null = '';
  artistTracks$!: Observable<ArtistTracks | null>;
  id!: string;

  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.suggestedArtist$ = this.store.select(
      fromArtist.selectSuggestedArtists
    );
    this.artistInfo$ = this.store.select(fromArtist.selectArtistData);
    this.artistAlbums$ = this.store.select(fromArtist.selectAlbumsData);
    this.artistTracks$ = this.store.select(fromArtist.selectTracks);
    this.artistInfo$.subscribe((data) => {
      if (data) {
        this.id = data.id;
        this.store.dispatch(getArtistAlbumsAction({ id: this.id, url: '' }));
        this.store.dispatch(getArtistTracksAction({ id: this.id }));
        this.store.dispatch(getSuggestedArtist({ id: this.id }));
      }
    });
    this.artistAlbums$.subscribe({
      next: (res) => {
        if (res) {
          this.ArtistsAlbumsNext = res.next;
          this.ArtistsAlbumsPrevious = res.previous;
        }
      },
    });
  }
  goToPreviousAlbums() {
    this.store.dispatch(
      getArtistAlbumsAction({ id: this.id, url: this.ArtistsAlbumsPrevious })
    );
  }
  goToNextAlbums() {
    this.store.dispatch(
      getArtistAlbumsAction({ id: this.id, url: this.ArtistsAlbumsNext })
    );
  }
  handleFollowClick() {
    this.artistInfo$.pipe(first()).subscribe((artist) => {
      console.log(artist?.isFollowing);
      if (artist?.isFollowing) {
        this.store.dispatch(unFollowArtistsAction({ id: this.id }));
      } else {
        this.store.dispatch(followArtistsAction({ id: this.id }));
      }
    });
  }
  goToTrack(id: string) {
    console.log(id);
  }
  goToArtist(id: string) {
    console.log(id);
  }
  handleArtistClick(id: string) {
    window.scrollTo(0, 0);
    this.store.dispatch(getArtistAction({ id }));
  }
  handleFollowUnfollow(event: { type: string; id: string }) {
    if (event.type == 'unfollow') {
      this.store.dispatch(unFollowArtistsAction({ id: event.id }));
    } else {
      this.store.dispatch(followArtistsAction({ id: event.id }));
    }
  }
  saveRemoveAlbum(id: string) {
    console.log('test');
  }
  saveRemoveTrack(id: string) {
    console.log('test');
  }
}
