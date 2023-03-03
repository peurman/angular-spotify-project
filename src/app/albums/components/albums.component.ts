import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import {
  AlbumDetail,
  AlbumSavedItem,
  AlbumsSaved,
} from '../models/albums.interface';
import { AlbumService } from '../services/album.service';

import * as fromAlbum from 'src/app/store/album/album.selectors';
import {
  getTrackAction,
  SaveRemoveTrackAction,
} from 'src/app/store/track/track.actions';
import { Router } from '@angular/router';
import { CheckerService } from 'src/app/core/services/checker.service';
import { getArtistAction } from 'src/app/store/artist/artist.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(
    private store: Store,
    private albumService: AlbumService,
    private router: Router,
    private checkerService: CheckerService
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
    this.albumsSavedComplete.items.forEach((el) => {
      if (el.album.id === this.albumID) this.following = true;
    });
  }

  addRemoveTrack(id: string, saved: boolean) {
    this.store.dispatch(SaveRemoveTrackAction({ id, save: !saved }));
  }

  goToTrack(id: string) {
    this.store.dispatch(getTrackAction({ id }));
    this.router.navigateByUrl('tracks');
  }
  goToArtist(artistId: string) {
    this.store.dispatch(getArtistAction({ id: artistId }));
    this.router.navigateByUrl('artists');
  }
  saveRemoveAlbum(albumId: string) {
    if (this.following) {
      Swal.fire({
        title: 'Are you sure you want to remove this album?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#db1c1c',
        confirmButtonText: 'Yes, remove',
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.checkerService
              .saveRemoveAlbumFromLibrary(albumId, false)
              .subscribe(() => {
                Swal.fire({
                  title: 'Album successfully removed!',
                  timer: 1500,
                  icon: 'success',
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
              });
          }
        })
        .then(() => (this.following = !this.following));
    } else {
      this.checkerService
        .saveRemoveAlbumFromLibrary(albumId, true)
        .subscribe(() => {
          Swal.fire({
            title: 'Album successfully added!',
            timer: 1500,
            icon: 'success',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          this.following = !this.following;
        });
    }
  }
}
