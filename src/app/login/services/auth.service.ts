import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable()
//We can use the packcage angular-oauth2-oidc if Daniel authorize us
//https://www.npmjs.com/package/angular-oauth2-oidc

export class AuthService {
  configUrl = {
    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' + 
    environment.credentials.clientId + '&response_type=token' + 
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
}
