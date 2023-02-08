import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackGuard } from '../guards/callback.guard';
import { CallbackComponent } from './components/callback/callback.component';

import { LoginComponent } from './components/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
    canActivate: [CallbackGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
