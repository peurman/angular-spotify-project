import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.scss'],
})
export class MyMusicComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private albumService: AlbumService,
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

  goToAlbum(id: string) {
    this.store.dispatch(getAlbumDetailAction({ id }));
    this.router.navigate(['/albums']);
    window.scrollTo(0, 0);
  }

  removeAlbum(id: string) {
    this.albumService
      .removeAlbumFromLibrary(id)
      .subscribe(() => this.store.dispatch(getMyAlbumsAction({ url: '' })));
  }

  removeTrack(id: string) {
    this.trackService
      .removeTrack(id)
      .subscribe(() => this.store.dispatch(getMyTracksAction({ url: '' })));
  }

  goToTrack(id: string) {
    console.log(id);
    this.store.dispatch(getTrackAction({ id }));
    this.router.navigate(['/tracks']);
    window.scrollTo(0, 0);
  }
  goToArtist(id: string) {
    console.log(id);
    // this.store.dispatch(getarti({ id }));
    this.router.navigate(['/artists']);
    window.scrollTo(0, 0);
  }
}
