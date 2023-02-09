import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMusicRoutingModule } from './my-music-routing.module';
import { MyMusicComponent } from './components/my-music.component';

@NgModule({
  declarations: [MyMusicComponent],
  imports: [CommonModule, MyMusicRoutingModule],
})
export class MyMusicModule {}
