import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromLogin from 'src/app/store/login/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'final-project-spotify';
  isLoggedIn = false;
  loggedIn$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(fromLogin.selectLogin);
  }
}
