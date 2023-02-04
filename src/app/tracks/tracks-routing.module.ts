import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { TracksComponent } from './components/tracks.component';

const routes: Routes = [
  {
    path: '',
    component: TracksComponent,
    children: [
      {
        path: ':id',
        component: TrackDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
