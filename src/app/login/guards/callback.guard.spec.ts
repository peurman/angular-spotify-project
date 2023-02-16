import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AuthToken } from '../models/authtoken.interface';
import { AuthService } from '../services/auth.service';
import { login, logout } from '../../store/login/login.actions';
import { CallbackGuard } from './callback.guard';

describe('CallbackGuard', () => {
  let guard: CallbackGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        CallbackGuard,
        { provide: Router, useValue: routerSpyObj },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
        { provide: Store, useValue: storeSpyObj },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', [
            'GetTokenFromCode',
            'SaveToken',
            'LogOut',
          ]),
        },
      ],
    });

    guard = TestBed.inject(CallbackGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should navigate to home if code parameter is present', () => {
    const token: AuthToken = {
      expirationDate: 12,
      refresh_token: 'test',
      access_token: '123',
      expires_in: 60,
      token_type: 'Bearer',
    };
    authSpy.GetTokenFromCode.and.returnValue(of(token));
    guard
      .canActivate({
        queryParamMap: { get: (param) => '123' },
      } as ActivatedRouteSnapshot)
      .subscribe((result) => {
        expect(result).toBeTrue();
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('home');
        expect(authSpy.SaveToken).toHaveBeenCalledWith(token);
      });
  });

  it('should handle error and navigate to login if GetTokenFromCode fails', () => {
    authSpy.GetTokenFromCode.and.returnValue(throwError('Error'));
    guard
      .canActivate({
        queryParamMap: { get: (param) => '123' },
      } as ActivatedRouteSnapshot)
      .subscribe((result) => {
        expect(result).toBeFalse();
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
        expect(authSpy.LogOut).toHaveBeenCalled();
        expect(storeSpy.dispatch).toHaveBeenCalledWith(logout());
        expect(snackBarSpy.open).toHaveBeenCalledWith(
          'Error: The acces code provided was wrong',
          'Ok',
          jasmine.any(MatSnackBarConfig)
        );
      });
  });

  it('should navigate to login if code parameter is not present', () => {
    guard
      .canActivate({
        queryParamMap: { get: () => null },
      } as unknown as ActivatedRouteSnapshot)
      .subscribe((result) => {
        expect(result).toBeFalse();
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
      });
  });
});
