import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TracksComponent } from './components/tracks.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';

@NgModule({
  declarations: [TracksComponent, TrackCardComponent, TrackDetailComponent],
  imports: [CommonModule, TracksRoutingModule],
})
export class TracksModule {}
