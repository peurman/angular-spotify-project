import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from '../models/authtoken.interface';
import { User } from 'src/app/store/login/login.state';
import { Store } from '@ngrx/store';

if (window.location.host.indexOf('localhost') !== -1) {
  environment.isLocal = true;
} else {
  environment.isLocal = false;
}
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  encoder = new TextEncoder();

  credentials = btoa(
    `${environment.credentials.clientId}:${environment.credentials.clientSecret}`
  );

  currentUrl = environment.isLocal
    ? 'http://localhost:4200'
    : 'https://final-project-spotify-applaudo.vercel.app';

  configUrl = {
    authorize:
      'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      environment.credentials.clientId +
      '&response_type=code' +
      '&scope=user-read-recently-played,user-top-read,user-read-playback-position,user-read-playback-state,user-follow-read,user-follow-modify,user-modify-playback-state, user-read-currently-playing,streaming,playlist-modify-public,playlist-modify-private,playlist-read-private,playlist-read-collaborative,user-library-modify,user-library-read,user-read-email,user-read-private' +
      '&redirect_uri=' +
      encodeURIComponent(`${this.currentUrl}/login/callback`) +
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
    if (tokenBefore.refresh_token) {
      token.refresh_token = tokenBefore.refresh_token;
    }
    localStorage.setItem('tokenInfo', JSON.stringify(token));
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
    body.set('redirect_uri', `${this.currentUrl}/login/callback`);
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
  VerifyToken(accessToken: string) {
    return this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        skip: 'true',
        Authorization: `Bearer ${accessToken}`,
      }),
    });
  }
  LogOut() {
    localStorage.removeItem('tokenInfo');
  }
  GetUserName() {
    return this.http.get<User>('https://api.spotify.com/v1/me');
  }
}
