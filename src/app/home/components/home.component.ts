import { Component } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  genres: string[] = [];

  genresTest = ['rock', 'pop'];

  constructor(private mainService: MainService) {
    this.mainService.getGenres().subscribe({
      next: data => {
        this.genres = data.genres;
      },
      error: error => {
        alert(error.message);
      },
    });
  }
}
