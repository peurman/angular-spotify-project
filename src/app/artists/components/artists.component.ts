import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Albums, Artist } from 'src/app/home/models/new-releases.interface';
import { getArtistAlbumsAction } from 'src/app/store/artist/artist.actions';
import * as fromArtist from 'src/app/store/artist/artist.selectors';
import {
  followArtistsAction,
  unFollowArtistsAction,
} from 'src/app/store/profile/profile.actions';
import { ArtistTracks } from './models/topartistracks.interface';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artistInfo$!: Observable<Artist | null>;
  artistAlbums$!: Observable<Albums | null>;
  ArtistsAlbumsNext: string | null = '';
  ArtistsAlbumsPrevious: string | null = '';
  artistTracks$!: Observable<ArtistTracks>;
  id!: string;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.artistInfo$ = this.store.select(fromArtist.selectArtistData);
    this.artistAlbums$ = this.store.select(fromArtist.selectAlbumsData);
    this.artistInfo$.subscribe((data) => {
      if (data) {
        this.id = data.id;
        this.store.dispatch(getArtistAlbumsAction({ id: this.id, url: '' }));
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
}
