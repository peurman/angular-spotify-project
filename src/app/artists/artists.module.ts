import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artist-routing.module';
import { ArtistsComponent } from './components/artists.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';

@NgModule({
  declarations: [ArtistsComponent, ArtistCardComponent],
  imports: [CommonModule, ArtistsRoutingModule],
  exports: [ArtistCardComponent],
})
export class ArtistsModule {}
