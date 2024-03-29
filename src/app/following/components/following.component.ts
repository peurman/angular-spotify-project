/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as fromMyMusic from 'src/app/store/my-music/my-music.selectors';
import {
  ArtistsFollowed,
  PlaylistsSaved,
} from '../../my-music/models/my-music.interface';

import {
  getMyArtistsAction,
  getMyPlaylistsAction,
} from 'src/app/store/my-music/my-music.actions';
import * as fromLogin from 'src/app/store/login/login.selectors';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';
import { PlaylistService } from 'src/app/playlists/services/playlists.service';
import { unFollowArtistsAction } from 'src/app/store/profile/profile.actions';
import { CheckerService } from 'src/app/core/services/checker.service';
import { getArtistAction } from 'src/app/store/artist/artist.actions';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private playlistService: PlaylistService,
    private checkerService: CheckerService
  ) {}

  saveOn = '../../../assets/images/saveOn.png';
  followingImage = '../../../assets/images/Following.jpg';
  defaultArtist = '../../../assets/images/defaultArtist.jpg';
  defaultAlbum = '../../../assets/images/defaultAlbum.jpg';

  username$!: Observable<string | undefined>;
  myPlaylists$!: Observable<PlaylistsSaved | null>;
  myArtists$!: Observable<ArtistsFollowed | null>;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.dispatch(getMyPlaylistsAction({ url: '' }));
    this.store.dispatch(getMyArtistsAction({ url: '' }));

    this.username$ = this.store.select(fromLogin.selectLoginUsername);
    this.myPlaylists$ = this.store.select(fromMyMusic.selectMyPlaylistsData);
    this.myArtists$ = this.store.select(fromMyMusic.selectMyArtistsData);
  }

  goToPreviousMyArtists(url: string | null) {
    this.store.dispatch(getMyArtistsAction({ url }));
  }
  goToNextMyArtists(url: string | null) {
    this.store.dispatch(getMyArtistsAction({ url }));
  }
  goToArtist(id: string) {
    this.store.dispatch(getArtistAction({ id }));
    this.router.navigateByUrl('artists');
  }

  goToPreviousMyPlaylists(url: string | null) {
    this.store.dispatch(getMyPlaylistsAction({ url }));
  }
  goToNextMyPlaylists(url: string | null) {
    this.store.dispatch(getMyPlaylistsAction({ url }));
  }
  goToPlaylist(id: string) {
    this.store.dispatch(getPlaylistAction({ id, url: '' }));
    this.router.navigateByUrl('playlists');
  }

  unfollowArtist(id: string) {
    Swal.fire({
      title: 'Are you sure you want to unfollow this artist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#db1c1c',
      confirmButtonText: 'Yes, unfollow',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(unFollowArtistsAction({ id }));
        }
      })
      .then(() => {
        this.store.dispatch(getMyArtistsAction({ url: '' }));
      });
  }

  unfollowPlaylist(id: string) {
    Swal.fire({
      title: 'Are you sure you want to unfollow this playlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#db1c1c',
      confirmButtonText: 'Yes, unfollow',
    }).then((result) => {
      if (result.isConfirmed) {
        this.playlistService.unfollowPlaylist(id).subscribe(() => {
          Swal.fire({
            title: 'Playlist successfully unfollowed!',
            timer: 1500,
            position: 'top-right',
            icon: 'success',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.store.dispatch(getMyPlaylistsAction({ url: '' }));
        });
      }
    });
  }
}
