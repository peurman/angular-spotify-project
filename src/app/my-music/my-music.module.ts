import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMusicRoutingModule } from './my-music-routing.module';
import { MyMusicComponent } from './components/my-music.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [MyMusicComponent],
  imports: [CommonModule, MyMusicRoutingModule, CoreModule],
})
export class MyMusicModule {}
