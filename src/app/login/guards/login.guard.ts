import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (!tokenInfo) {
      return of(true);
    } else {
      this.router.navigateByUrl('home');
      return of(false);
    }
  }
}
