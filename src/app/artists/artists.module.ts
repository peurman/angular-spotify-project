import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artist-routing.module';
import { ArtistsComponent } from './components/artists.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';

@NgModule({
  declarations: [ArtistsComponent, ArtistCardComponent, ArtistDetailComponent],
  imports: [CommonModule, ArtistsRoutingModule],
})
export class ArtistsModule {}
