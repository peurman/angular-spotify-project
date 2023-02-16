import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../login/services/auth.service';
import { MainGuard } from './main.guard';

describe('MainGuard', () => {
  let guard: MainGuard;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch']);
    const authSpyObj = jasmine.createSpyObj('AuthService', [
      'VerifyToken',
      'LogOut',
    ]);
    TestBed.configureTestingModule({
      providers: [
        MainGuard,
        { provide: Router, useValue: routerSpyObj },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
        { provide: Store, useValue: storeSpyObj },
        { provide: AuthService, useValue: authSpyObj },
      ],
    });
  });

  it('should return true if token is verified', () => {
    const authSpyObj = jasmine.createSpyObj('AuthService', {
      VerifyToken: of('mock data'),
      LogOut: of('mock data'),
    });
    TestBed.overrideProvider(AuthService, { useValue: authSpyObj });
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    guard = TestBed.inject(MainGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    TestBed.compileComponents();
    authSpy.VerifyToken.and.returnValue(of(true)).and.callThrough();
    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();

      expect(snackBarSpy.open).not.toHaveBeenCalled();
    });
  });

  it('should return false if token is not present', () => {
    const authSpyObj = jasmine.createSpyObj('AuthService', [
      'VerifyToken',
      'LogOut',
    ]);
    TestBed.overrideProvider(AuthService, { useValue: authSpyObj });
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    guard = TestBed.inject(MainGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(storeSpy.dispatch).not.toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
      expect(snackBarSpy.open).not.toHaveBeenCalled();
    });
  });
});
