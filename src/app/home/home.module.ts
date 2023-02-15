import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [HomeComponent, MainPageComponent],
  imports: [CommonModule, HttpClientModule, HomeRoutingModule, CoreModule],
})
export class HomeModule {}
