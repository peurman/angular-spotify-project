import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (!tokenInfo) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
