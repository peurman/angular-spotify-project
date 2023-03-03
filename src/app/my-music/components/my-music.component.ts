import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as fromMyMusic from 'src/app/store/my-music/my-music.selectors';
import { TracksSaved, AlbumsSaved } from '../models/my-music.interface';

import {
  getMyAlbumsAction,
  getMyTracksAction,
} from 'src/app/store/my-music/my-music.actions';
import * as fromLogin from 'src/app/store/login/login.selectors';
import { getAlbumDetailAction } from 'src/app/store/album/album.actions';
import { AlbumService } from 'src/app/albums/services/album.service';
import { TrackService } from 'src/app/tracks/services/track.service';
import {
  getTrackAction,
  SaveRemoveTrackAction,
} from 'src/app/store/track/track.actions';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import { CheckerService } from 'src/app/core/services/checker.service';

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.scss'],
})
export class MyMusicComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private checkerService: CheckerService,
    private trackService: TrackService
  ) {}

  saveOn = '../../../assets/images/saveOn.png';
  myMusic = '../../../assets/images/MyMusic.jpg';

  username$!: Observable<string | undefined>;
  myAlbums$!: Observable<AlbumsSaved | null>;
  myTracks$!: Observable<TracksSaved | null>;

  myAlbumsPrevious = false;
  myAlbumsNext = false;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.dispatch(getMyAlbumsAction({ url: '' }));
    this.store.dispatch(getMyTracksAction({ url: '' }));

    this.username$ = this.store.select(fromLogin.selectLoginUsername);
    this.myAlbums$ = this.store.select(fromMyMusic.selectMyAlbumsData);
    this.myTracks$ = this.store.select(fromMyMusic.selectMyTracksData);
  }

  goToPreviousMyAlbums(url: string | null) {
    this.store.dispatch(getMyAlbumsAction({ url }));
  }
  goToNextMyAlbums(url: string | null) {
    this.store.dispatch(getMyAlbumsAction({ url }));
  }

  goToPreviousMyTracks(url: string | null) {
    this.store.dispatch(getMyTracksAction({ url }));
  }
  goToNextMyTracks(url: string | null) {
    this.store.dispatch(getMyTracksAction({ url }));
  }

  goToAlbum(id: string) {
    this.store.dispatch(getAlbumDetailAction({ id }));
    this.router.navigateByUrl('albums');
  }

  removeAlbum(id: string) {
    Swal.fire({
      title: 'Are you sure you want to remove this album?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#db1c1c',
      confirmButtonText: 'Yes, remove',
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkerService
          .saveRemoveAlbumFromLibrary(id, false)
          .subscribe(() => {
            Swal.fire({
              title: 'Album successfully removed!',
              timer: 1500,
              icon: 'success',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.store.dispatch(getMyAlbumsAction({ url: '' }));
          });
      }
    });
  }

  removeTrack(id: string) {
    Swal.fire({
      title: 'Are you sure you want to remove this track?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#db1c1c',
      confirmButtonText: 'Yes, remove',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(SaveRemoveTrackAction({ id: id, save: false }));
        }
      })
      .then(() => {
        this.store.dispatch(getMyTracksAction({ url: '' }));
      });
  }

  goToTrack(id: string) {
    this.store.dispatch(getTrackAction({ id }));
    this.router.navigateByUrl('tracks');
  }
  goToArtist(id: string) {
    this.store.dispatch(getArtistAction({ id }));
    this.router.navigateByUrl('artists');
  }
}
