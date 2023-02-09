import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromLogin from 'src/app/store/login/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'final-project-spotify';
  subscription!: Subscription;
  isLoggedIn = false;
  loggedIn$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    if (localStorage.getItem('tokenInfo')) {
      this.loggedIn$ = this.store.select(fromLogin.selectLogin);
      this.subscription = this.loggedIn$.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
