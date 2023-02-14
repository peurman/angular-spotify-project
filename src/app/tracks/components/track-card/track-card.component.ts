import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from 'src/app/profile/model/toptracks.interface';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent {
  @Output() saveRemoveEvent = new EventEmitter<{
    type: string;
    id: string;
  }>();
  @Input() track!: Track | undefined;
  @Output() selectTrack = new EventEmitter<Track>();
  handleClick() {
    if (this.track) {
      this.selectTrack.emit(this.track);
    }
  }
}
