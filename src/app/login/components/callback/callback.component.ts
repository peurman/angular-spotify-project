import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService){
    if(this.route.snapshot.fragment){
      const params = new URLSearchParams(this.route.snapshot.fragment);
      const accessToken = params.get('access_token');
      const expiresIn = params.get('access_token');
      if(accessToken && expiresIn){
        this.auth.SaveTokenAndExpiration(accessToken, expiresIn);
        this.router.navigateByUrl('/home');
      }
    }
    //Add Validation in case somebody try to access to the path without token
  }
}
