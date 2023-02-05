import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {  HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
//We can use the packcage angular-oauth2-oidc if Daniel authorize us
//https://www.npmjs.com/package/angular-oauth2-oidc

export class AuthService {
  constructor(private http: HttpClient){}
  configUrl = {
    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' + 
    environment.credentials.clientId + '&response_type=code' + 
    '&redirect_uri=' + encodeURIComponent('http://localhost:4200/login/callback') +
    '&expires_in=3600'
  }
  OpenSpotifyWindow(){
    window.location.href = this.configUrl.authorize;
  }
  SaveTokenAndExpiration(accessToken: string, expiresIn: string){
    sessionStorage.setItem('token', accessToken)
    sessionStorage.setItem('expiresIn', expiresIn)
  }
  GeTokenFromCode(accessCode: string){
    const body = new URLSearchParams();
    body.set('code', accessCode);
    body.set('redirect_uri', 'http://localhost:4200/login/callback')
    body.set('grant_type', 'authorization_code')
    const credentials = btoa(`${environment.credentials.clientId}:${environment.credentials.clientSecret}`);
    return this.http.post('https://accounts.spotify.com/api/token', body, {headers: new HttpHeaders({Authorization: `Basic ${credentials}`, 'Content-Type':'application/x-www-form-urlencoded'})})
  }
}
