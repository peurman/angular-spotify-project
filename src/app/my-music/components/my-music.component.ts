import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as fromMyMusic from 'src/app/store/my-music/my-music.selectors';
import {
  ArtistsFollowed,
  PlaylistsSaved,
  TracksSaved,
  AlbumsSaved,
} from '../models/my-music.interface';

import {
  getMyAlbumsAction,
  getMyTracksAction,
} from 'src/app/store/my-music/my-music.actions';
import * as fromLogin from 'src/app/store/login/login.selectors';
import { getAlbumDetailAction } from 'src/app/store/album/album.actions';
import { AlbumService } from 'src/app/albums/services/album.service';

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.scss'],
})
export class MyMusicComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private albumService: AlbumService
  ) {}

  saveOn = '../../../assets/images/saveOn.png';
  myMusic = '../../../assets/images/MyMusic.jpg';

  username$!: Observable<string | undefined>;

  myPlaylists$!: Observable<PlaylistsSaved | null>;
  myArtists$!: Observable<ArtistsFollowed | null>;
  myAlbums$!: Observable<AlbumsSaved | null>;
  myTracks$!: Observable<TracksSaved | null>;

  myAlbumsPrevious = false;
  myAlbumsNext = false;

  ngOnInit(): void {
    this.username$ = this.store.select(fromLogin.selectLoginUsername);
    this.myPlaylists$ = this.store.select(fromMyMusic.selectMyPlaylistsData);
    this.myArtists$ = this.store.select(fromMyMusic.selectMyArtistsData);
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
    this.albumService.removeAlbumFromLibrary(id).subscribe();
    this.store.dispatch(getMyAlbumsAction({ url: '' }));
    window.scrollTo(0, 0);
  }
}
