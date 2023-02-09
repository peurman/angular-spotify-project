import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyMusicComponent } from './components/my-music.component';

const routes: Routes = [
  {
    path: '',
    component: MyMusicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMusicRoutingModule {}
