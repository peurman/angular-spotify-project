import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from 'src/app/home/models/new-releases.interface';
import { ArtistinfoService } from '../../services/artistinfo.service';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent {
  constructor(private artistService: ArtistinfoService) {}
  defaultArtist = '../../../assets/images/defaultArtist.jpg';
  @Output() followUnFollowEvent = new EventEmitter<{
    type: string;
    id: string;
  }>();
  @Output() artistClickedEvent = new EventEmitter<string>();
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
  handleArtistClick(id: string) {
    this.artistClickedEvent.emit(id);
  }
}
