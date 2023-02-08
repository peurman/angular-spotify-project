import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home.component';
import { SearchComponent } from '../search/components/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  // { path: 'profile', component: ProfileComponent },
];
@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent, RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
