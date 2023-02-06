import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login.component';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [CommonModule, LoginRoutingModule, HttpClientModule],
  providers: [AuthService]
})
export class LoginModule {}
