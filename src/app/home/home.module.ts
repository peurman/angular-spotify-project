import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [HomeComponent, MainPageComponent],
  imports: [CommonModule],
})
export class HomeModule {}
