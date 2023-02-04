import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./artists/artists.module').then(m => m.ArtistsModule),
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./playlists/playlists.module').then(m => m.PlaylistsModule),
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then(m => m.AlbumsModule),
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./tracks/tracks.module').then(m => m.TracksModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
