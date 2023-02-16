import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

import * as fromPlaylist from 'src/app/store/playlists/playlist.selectors';
import {
  getTrackAction,
  SaveRemoveTrackAction,
} from 'src/app/store/track/track.actions';

import { PlaylistService } from '../services/playlists.service';
import { Playlist, PlaylistsSaved } from '../models/playlists.interface';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import { getPlaylistAction } from 'src/app/store/playlists/playlist.actions';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  constructor(
    private store: Store,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';
  defaultAlbum = '../../../assets/images/defaultAlbum.jpg';
  following = false;

  playlist$!: Observable<Playlist | null>;
  playlistIsLoading$!: Observable<boolean>;
  playlistID: string | undefined;
  playlistsSavedComplete!: PlaylistsSaved | null;

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.playlist$ = this.store.select(fromPlaylist.selectPlaylistData);
    this.playlistIsLoading$ = this.store.select(fromPlaylist.selectIsLoading);
    this.playlist$.subscribe((res) => (this.playlistID = res?.id));

    this.playlistsSavedComplete = await firstValueFrom(
      this.playlistService.getPlaylistsSaved()
    );
    this.playlistsSavedComplete.items.forEach((el) => {
      if (el.id === this.playlistID) this.following = true;
    });
  }

  goToTrack(trackId: string) {
    this.store.dispatch(getTrackAction({ id: trackId }));
    this.router.navigateByUrl('/tracks');
  }

  goToArtist(id: string) {
    this.store.dispatch(getArtistAction({ id }));
    this.router.navigateByUrl('artists');
  }
  goToPreviousTracks(url: string | null) {
    this.store.dispatch(getPlaylistAction({ id: '', url }));
  }
  goToNextTracks(url: string | null) {
    this.store.dispatch(getPlaylistAction({ id: '', url }));
  }

  addRemoveTrack(id: string, saved: boolean) {
    this.store.dispatch(SaveRemoveTrackAction({ id, save: !saved }));
  }

  followUnfollowPlaylist(playlistId: string) {
    if (this.following) {
      this.playlistService.unfollowPlaylist(playlistId).subscribe();
    } else {
      this.playlistService.followPlaylist(playlistId).subscribe();
    }
    this.following = !this.following;
  }
}
