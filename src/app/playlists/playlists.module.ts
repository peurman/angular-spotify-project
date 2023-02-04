import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsRoutingModule } from './playlists-routing.module';

import { PlaylistsComponent } from './components/playlists.component';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistCardComponent,
    PlaylistDetailComponent,
  ],
  imports: [CommonModule, PlaylistsRoutingModule],
})
export class PlaylistsModule {}
