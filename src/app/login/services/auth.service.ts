import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from '../models/authtoken.interface';
import { Store } from '@ngrx/store';
import { login, logout } from '../../store/login/login.actions';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}
  encoder = new TextEncoder();

  credentials = btoa(
    `${environment.credentials.clientId}:${environment.credentials.clientSecret}`
  );

  configUrl = {
    authorize:
      'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      environment.credentials.clientId +
      '&response_type=code' +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:4200/login/callback') +
      '&expires_in=3600',
  };
  OpenSpotifyWindow() {
    window.location.href = this.configUrl.authorize;
  }
  SaveToken(token: AuthToken) {
    const date = new Date();
    const expirationDate = date.setSeconds(
      date.getSeconds() + token.expires_in
    );
    token.expirationDate = expirationDate;
    const tokenBefore = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    if (Object.keys(tokenBefore).length !== 0) {
      token.refresh_token = tokenBefore.refresh_token;
    }
    localStorage.setItem('tokenInfo', JSON.stringify(token));
    this.store.dispatch(login({ user: 'John Doe' }));
  }
  RefreshToken() {
    const token = JSON.parse(localStorage.getItem('tokenInfo') || '{}');
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', token.refresh_token);
    return this.http.post<AuthToken>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: new HttpHeaders({
          Authorization: `Basic ${this.credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
  GetTokenFromCode(accessCode: string) {
    const body = new URLSearchParams();
    body.set('code', accessCode);
    body.set('redirect_uri', 'http://localhost:4200/login/callback');
    body.set('grant_type', 'authorization_code');
    return this.http.post<AuthToken>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: new HttpHeaders({
          Authorization: `Basic ${this.credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
}
