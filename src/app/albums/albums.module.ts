import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './components/albums.component';

import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AlbumsComponent],
  imports: [CommonModule, AlbumsRoutingModule, CoreModule],
})
export class AlbumsModule {}
