import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromLogin from 'src/app/store/login/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'final-project-spotify';
  subscription!: Subscription;
  isLoggedIn = false;
  loggedIn$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(fromLogin.selectLogin);
  }
}
