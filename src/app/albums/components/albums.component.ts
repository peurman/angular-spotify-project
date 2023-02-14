import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';

import {
  AlbumDetail,
  AlbumSavedItem,
  AlbumsSaved,
} from '../models/albums.interface';
import { AlbumService } from '../services/album.service';

import * as fromAlbum from 'src/app/store/album/album.selectors';
import { getTrackAction } from 'src/app/store/track/track.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(
    private store: Store,
    private albumService: AlbumService,
    private router: Router
  ) {}

  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';
  following = false;

  album$!: Observable<AlbumDetail | null>;
  albumID: string | undefined;
  albumsSaved: AlbumSavedItem[] | undefined = [];
  albumsSavedComplete!: AlbumsSaved | null;

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.album$ = this.store.select(fromAlbum.selectAlbumDetailData);
    this.album$.subscribe((res) => (this.albumID = res?.id));

    this.albumsSavedComplete = await firstValueFrom(
      this.albumService.getAlbumsSaved()
    );
    console.log(
      'ALBUMS SAVED: ',
      this.albumsSavedComplete.items,
      '- ALBUM ID: ',
      this.albumID
    );
    this.albumsSavedComplete.items.forEach((el) => {
      if (el.album.id === this.albumID) this.following = true;
    });
  }

  goToTrack(trackId: string) {
    this.store.dispatch(getTrackAction({ id: trackId }));
    this.router.navigateByUrl('/tracks');
  }
  goToArtist(artistId: string) {
    console.log('ARTIST ID: ', artistId);
  }
  saveRemoveAlbum(albumId: string) {
    if (this.following) {
      this.albumService.removeAlbumFromLibrary(albumId).subscribe();
    } else {
      this.albumService.saveAlbumToLibrary(albumId).subscribe();
    }
    this.following = !this.following;
  }
}
