import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService){}
  ngOnInit(): void {
    if(this.route.snapshot.queryParams){
      const params = new URLSearchParams(this.route.snapshot.queryParams);
      const accessCode = params.get('code');
      if(accessCode){
        this.auth.GeTokenFromCode(accessCode).subscribe((response:any) => {
          this.auth.SaveToken(response);
          this.router.navigateByUrl('/home');
        });

      }
    }
  }
    //Add Validation in case somebody try to access to the path without token
}
