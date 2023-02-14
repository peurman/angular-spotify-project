import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowingRoutingModule } from './following-routing';
import { FollowingComponent } from './components/following.component';

@NgModule({
  declarations: [FollowingComponent],
  imports: [CommonModule, FollowingRoutingModule],
})
export class FollowingModule {}
