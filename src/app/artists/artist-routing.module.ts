import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { ArtistsComponent } from './components/artists.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
    children: [
      {
        path: ':id',
        component: ArtistDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
