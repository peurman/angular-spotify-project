import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
