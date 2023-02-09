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
  handleClick() {
    if (this.track) {
      // if (this.track) {
      //   this.saveRemoveEvent.emit({ type: 'unfollow', id: this.artist.id });
      // } else {
      //   this.saveRemoveEvent.emit({ type: 'follow', id: this.artist.id });
      // }
    }
  }
}
