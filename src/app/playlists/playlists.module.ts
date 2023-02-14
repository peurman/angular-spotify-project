import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { CoreModule } from '../core/core.module';

import { PlaylistsComponent } from './components/playlists.component';

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [CommonModule, PlaylistsRoutingModule, CoreModule],
})
export class PlaylistsModule {}
