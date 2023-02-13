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
  getMyPlaylistsAction,
  getMyAlbumsAction,
  getMyArtistsAction,
  getMyTracksAction,
} from 'src/app/store/my-music/my-music.actions';

@Component({
  selector: 'app-my-music',
  templateUrl: './my-music.component.html',
  styleUrls: ['./my-music.component.scss'],
})
export class MyMusicComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  myPlaylists$!: Observable<PlaylistsSaved | null>;
  myArtists$!: Observable<ArtistsFollowed | null>;
  myAlbums$!: Observable<AlbumsSaved | null>;
  myTracks$!: Observable<TracksSaved | null>;

  ngOnInit(): void {
    this.myPlaylists$ = this.store.select(fromMyMusic.selectMyPlaylistsData);
    this.myArtists$ = this.store.select(fromMyMusic.selectMyArtistsData);
    this.myAlbums$ = this.store.select(fromMyMusic.selectMyAlbumsData);
    this.myTracks$ = this.store.select(fromMyMusic.selectMyTracksData);
  }
}
