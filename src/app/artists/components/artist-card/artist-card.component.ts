import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from 'src/app/home/models/new-releases.interface';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent {
  @Output() followUnFollowEvent = new EventEmitter<{
    type: string;
    id: string;
  }>();
  @Input() artist!: Artist | undefined;
  handleClick() {
    if (this.artist) {
      if (this.artist.isFollowing) {
        this.followUnFollowEvent.emit({ type: 'unfollow', id: this.artist.id });
      } else {
        this.followUnFollowEvent.emit({ type: 'follow', id: this.artist.id });
      }
    }
  }
}
