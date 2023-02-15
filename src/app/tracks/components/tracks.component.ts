import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from 'src/app/profile/model/toptracks.interface';
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
    this.store.dispatch(getArtistAction({ id: id }));
    this.router.navigateByUrl('artists');
  }
  saveRemoveTrack(id: string, saved: boolean | undefined) {
    if (saved) {
      this.store.dispatch(SaveRemoveTrackAction({ id: id, save: false }));
    } else {
      this.store.dispatch(SaveRemoveTrackAction({ id: id, save: true }));
    }
  }
}
