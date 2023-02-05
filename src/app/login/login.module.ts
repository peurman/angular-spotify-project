import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [CommonModule, LoginRoutingModule],
  providers: [AuthService]
})
export class LoginModule {}
