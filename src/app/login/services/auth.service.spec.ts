import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthToken } from '../models/authtoken.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token', () => {
    const token: AuthToken = {
      expirationDate: 1222,
      refresh_token: 'test_refresh_token',
      access_token: 'test_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    };
    service.SaveToken(token);
    expect(localStorage.getItem('tokenInfo')).toEqual(JSON.stringify(token));
  });

  it('should refresh token', () => {
    const token: AuthToken = {
      access_token: 'test_access_token',
      expirationDate: 1222,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'test_refresh_token',
    };
    localStorage.setItem('tokenInfo', JSON.stringify(token));
    service.RefreshToken().subscribe((res) => {
      expect(res.access_token).toEqual('new_test_access_token');
    });
    const req = httpMock.expectOne('https://accounts.spotify.com/api/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('grant_type')).toEqual('refresh_token');
    expect(req.request.body.get('refresh_token')).toEqual('test_refresh_token');
    req.flush({
      access_token: 'new_test_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    });
  });

  it('should get token from code', () => {
    const accessCode = 'test_access_code';
    service.GetTokenFromCode(accessCode).subscribe((res) => {
      expect(res.access_token).toEqual('test_access_token');
    });
    const req = httpMock.expectOne('https://accounts.spotify.com/api/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('code')).toEqual(accessCode);
    expect(req.request.body.get('grant_type')).toEqual('authorization_code');
    req.flush({
      access_token: 'test_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    });
  });

  it('should verify token', () => {
    const accessToken = 'test_access_token';
    service.VerifyToken(accessToken).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne('https://api.spotify.com/v1/me');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${accessToken}`
    );
    req.flush({});
  });

  it('should logout', () => {
    service.LogOut();
    expect(localStorage.getItem('tokenInfo')).toBeNull();
  });

  it('should get user name', () => {
    service.GetUserName().subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne('https://api.spotify.com/v1/me');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
