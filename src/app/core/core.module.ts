import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HomeComponent } from '../home/components/home.component';
import { SearchComponent } from '../search/components/search.component';
import { MyMusicComponent } from '../my-music/components/my-music.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from '../profile/components/profile/profile.component';

import { TimesPipe } from './pipes/times.pipe';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'myMusic', component: MyMusicComponent },
];
@NgModule({
  declarations: [SidebarComponent, LoadingComponent, TimesPipe],
  exports: [SidebarComponent, RouterModule, LoadingComponent, TimesPipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
