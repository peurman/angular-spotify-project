import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Track } from 'src/app/profile/model/toptracks.interface';
import { getAlbumDetailAction } from 'src/app/store/album/album.actions';
import { getArtistAction } from 'src/app/store/artist/artist.actions';
import { SaveRemoveTrackAction } from 'src/app/store/track/track.actions';
import * as fromTrack from 'src/app/store/track/track.selector';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  track$!: Observable<Track | null>;
  saveOn = '../../../assets/images/saveOn.png';
  saveOff = '../../../assets/images/saveOff.png';
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.track$ = this.store.select(fromTrack.selectTrack);
  }
  goToArtist(id: string) {
    this.store.dispatch(getArtistAction({ id }));
    this.router.navigateByUrl('artists');
  }
  goToAlbum(id: string) {
    this.store.dispatch(getAlbumDetailAction({ id }));
    this.router.navigateByUrl('albums');
  }
  saveRemoveTrack(id: string, saved: boolean | undefined) {
    if (saved) {
      Swal.fire({
        title: 'Are you sure you want to remove this track?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#db1c1c',
        confirmButtonText: 'Yes, remove',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(SaveRemoveTrackAction({ id: id, save: false }));
        }
      });
    } else this.store.dispatch(SaveRemoveTrackAction({ id, save: true }));
  }
}
