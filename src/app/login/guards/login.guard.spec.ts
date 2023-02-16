import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginGuard],
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
  });

  it('should allow access if no token is found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    guard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
    });
  });

  it('should redirect to home if a token is found', () => {
    spyOn(localStorage, 'getItem').and.returnValue('tokenInfo');
    spyOn(router, 'navigateByUrl');
    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('home');
    });
  });
});
