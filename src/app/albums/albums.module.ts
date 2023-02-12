import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './components/albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AlbumsComponent, AlbumCardComponent, AlbumDetailComponent],
  imports: [CommonModule, AlbumsRoutingModule, CoreModule],
})
export class AlbumsModule {}
