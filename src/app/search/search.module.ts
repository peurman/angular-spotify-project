import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, FormsModule, CoreModule],
})
export class SearchModule {}
