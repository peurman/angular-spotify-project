import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from 'src/app/profile/model/toptracks.interface';
import * as fromTrack from 'src/app/store/track/track.selector';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  track$!: Observable<Track | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.track$ = this.store.select(fromTrack.selectTrack);
  }
  goToArtist() {
    console.log();
  }
}
