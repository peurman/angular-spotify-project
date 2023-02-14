import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowingComponent } from './components/following.component';

const routes: Routes = [
  {
    path: '',
    component: FollowingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowingRoutingModule {}
