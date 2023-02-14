import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
// import { Artist } from 'src/app/tracks/services/track.service';
// import { getTrackAction } from 'src/app/store/track/track.actions';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss'],
})
export class FollowingComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private playlistService: PlaylistService // private artistService: ArtistService
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
    // this.store.dispatch(getArtistDetail({ id }));
    this.router.navigate(['/artists']);
    window.scrollTo(0, 0);
  }

  goToPreviousMyPlaylists(url: string | null) {
    this.store.dispatch(getMyPlaylistsAction({ url }));
  }
  goToNextMyPlaylists(url: string | null) {
    this.store.dispatch(getMyPlaylistsAction({ url }));
  }
  goToPlaylist(id: string) {
    this.store.dispatch(getPlaylistAction({ id }));
    this.router.navigate(['/playlists']);
    window.scrollTo(0, 0);
  }

  unfollowArtist(id: string) {
    console.log('UNFOLLOW ID: ', id);
    // this.artistService.unfollowArtist(id)
    //   .subscribe(() => this.store.dispatch(getMyArtistsAction({ url: '' })));
  }

  unfollowPlaylist(id: string) {
    this.playlistService
      .unfollowPlaylist(id)
      .subscribe(() => this.store.dispatch(getMyPlaylistsAction({ url: '' })));
  }
}
