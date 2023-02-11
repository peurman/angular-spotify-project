import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
// import { toPromise } from 'rxjs/internal/operators/toPromise';

import { AlbumDetail, AlbumSavedItem } from '../models/albums.interface';
import { AlbumService } from '../services/album.service';

import * as fromAlbum from 'src/app/store/album/album.selectors';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(private store: Store, private albumService: AlbumService) {}

  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';
  following = false;

  albumDetail$!: Observable<AlbumDetail | null>;
  albumID: string | undefined;
  albumsSaved: AlbumSavedItem[] | undefined = [];

  ngOnInit() {
    this.albumDetail$ = this.store.select(fromAlbum.selectAlbumDetailData);
    this.albumDetail$.subscribe((res) => (this.albumID = res?.id));

    this.albumService
      .getAlbumsSaved()
      .pipe(first())
      .toPromise()
      .then((res) => {
        this.albumsSaved = res?.items;
        console.log(
          'ALBUMS SAVED: ',
          this.albumsSaved,
          '- ALBUM ID: ',
          this.albumID
        );
        this.albumsSaved?.forEach((el) => {
          if (el.album.id === this.albumID) this.following = true;
        });
      });
  }

  goToTrack(trackId: string) {
    console.log('TRACK ID: ', trackId);
  }
  goToArtist(artistId: string) {
    console.log('ARTIST ID: ', artistId);
  }
  saveRemoveAlbum() {
    if (this.following) {
      console.log('REMOVE');
    } else {
      console.log('SAVE');
    }
    this.following = !this.following;
  }
}
